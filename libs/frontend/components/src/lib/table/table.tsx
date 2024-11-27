/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColDef, RowClassParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import TableLoadingCell from './table-loading-cell/table-loading-cell';
import Icon from '../icon/icon';
import { NoDataIcon } from '../constants';
import { useTranslation } from 'react-i18next';

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
}: TableProps) {
  /* eslint-disable-next-line */
  const [autoHeight, setAutoHeight] = React.useState<number>(200);

  const { t } = useTranslation();

  React.useEffect(() => {
    if (loading) {
      setAutoHeight(rowHeight * loadingRow + headerHeight + 3);
      return;
    }

    setAutoHeight(
      heightFix
        ? heightFix
        : data.length
        ? rowHeight * data.length + headerHeight + 3
        : 200
    );
  }, [data, heightFix, headerHeight, rowHeight, loading, loadingRow]);

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
        `}
      </style>
      <AgGridReact
        ref={tableRef}
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              color: '#334155',
            }}
          >
            <Icon src={NoDataIcon} />
            <p
              style={{
                fontWeight: 600,
                marginBottom: '4px',
              }}
            >
              {t('table.nodata.title')}
            </p>
            <p
              style={{
                fontSize: '12px',
                color: '#64748B',
              }}
            >
              {t('table.nodata.description')}
            </p>
          </div>
        )}
      />
    </div>
  );
}

export default React.memo(Table);
