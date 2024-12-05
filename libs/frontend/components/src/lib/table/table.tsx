/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginationResponse } from '@frontend/model';
import { ColDef, RowClassParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { AgGridLocale } from '../constants';
import NoData from '../no-data/no-data';
import TableLoadingCell from './table-loading-cell/table-loading-cell';

/* eslint-disable-next-line */
export interface TableProps {
  colDef?: any;
  columns: ColDef[];
  data: any[];
  loading?: boolean;
  loadingRow?: number;
  defaultColumnDefinition?: ColDef;
  headerHeight?: number;
  heightFix?: number;
  rowHeight?: number;
  selectionMode?: 'single' | 'multiple';
  showLastBorderBottom?: boolean;
  showPagination?: boolean;

  pagination?: PaginationResponse;
  onSelectionChanged?: (params: any) => void;
}

export function Table({
  columns,
  data,
  loading = false,
  loadingRow = 3,
  defaultColumnDefinition,
  heightFix,
  rowHeight = 40,
  headerHeight = 48,
  onSelectionChanged,
  selectionMode,
  showLastBorderBottom = false,
  showPagination = true,
  pagination,
}: TableProps) {
  /* eslint-disable-next-line */
  const [autoHeight, setAutoHeight] = React.useState<number>(200);

  const language = React.useMemo(() => {
    return localStorage.getItem('lang') || 'en';
  }, []);

  React.useEffect(() => {
    const baseHeight =
      rowHeight * (loading ? loadingRow : data.length) + headerHeight + 3;
    const calculatedHeight = heightFix || (data.length ? baseHeight : 200);

    setAutoHeight(
      !loading && showPagination
        ? calculatedHeight + headerHeight
        : calculatedHeight
    );
  }, [
    data.length,
    heightFix,
    headerHeight,
    rowHeight,
    loading,
    loadingRow,
    showPagination,
  ]);

  const tableRef = React.useRef<AgGridReact>(null);

  const defaultColumnDefinitionMemo = React.useMemo(() => {
    return {
      resizable: false,
      flex: 1,
    };
  }, []);

  const columnDefs = React.useMemo(() => {
    return columns.map((col) => ({
      ...col,
      cellRenderer: loading ? () => <TableLoadingCell /> : col.cellRenderer,
    }));
  }, [columns, loading]);

  const onSelectionChangedCallback = React.useCallback(() => {
    const selectedRows = tableRef.current?.api.getSelectedRows();
    onSelectionChanged?.(selectedRows);
  }, [onSelectionChanged, tableRef]);

  const getRowStyle = (params: RowClassParams<any, any>) => {
    const isLastRow = loading
      ? params.node.rowIndex === loadingRow - 1
      : params.node.rowIndex === data.length - 1;
    return isLastRow && !showLastBorderBottom
      ? { borderBottom: 'none' }
      : undefined;
  };

  return (
    <div
      className={`ag-theme-quartz`}
      style={{ width: '100%', height: autoHeight }}
    >
      <style>
        {`
          .ag-cell-focus, .ag-cell {
            border: none !important;
          }

          .ag-paging-panel {
            height: ${headerHeight}px !important;
            display: flex;
            align-items: center;
          }
        `}
      </style>
      <AgGridReact
        ref={tableRef}
        localeText={AgGridLocale[language]}
        pagination={!loading && data.length > 0 && showPagination}
        paginationPageSize={pagination?.itemsPerPage}
        rowData={loading ? Array(loadingRow).fill({}) : data}
        columnDefs={columnDefs}
        defaultColDef={defaultColumnDefinition ?? defaultColumnDefinitionMemo}
        rowHeight={rowHeight}
        headerHeight={headerHeight}
        getRowStyle={getRowStyle}
        rowSelection={
          selectionMode
            ? {
                mode: selectionMode === 'single' ? 'singleRow' : 'multiRow',
              }
            : undefined
        }
        onSelectionChanged={onSelectionChangedCallback}
        noRowsOverlayComponent={() => (
          <NoData
            title="table.nodata.title"
            description="table.nodata.description"
          />
        )}
      />
    </div>
  );
}

export default React.memo(Table);
