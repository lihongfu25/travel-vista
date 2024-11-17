/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColDef, RowClassParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';

/* eslint-disable-next-line */
export interface TableProps {
  colDef?: any;
  columns: ColDef[];
  data: any[];
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
  defaultColumnDefinition,
  heightFix,
  rowHeight = 40,
  headerHeight = 48,
  onSelectionChanged,
  selectionMode,
  showLastBorderBottom = true,
}: TableProps) {
  /* eslint-disable-next-line */
  const [autoHeight, setAutoHeight] = React.useState<number>(200);

  React.useEffect(() => {
    setAutoHeight(
      heightFix
        ? heightFix
        : data.length
        ? rowHeight * data.length + headerHeight + 3
        : 200
    );
  }, [data, heightFix, headerHeight, rowHeight]);

  const tableRef = React.useRef<AgGridReact>(null);

  const defaultColumnDefinitionMemo = React.useMemo(() => {
    return {
      resizable: false,
      flex: 1,
    };
  }, []);

  const onSelectionChangedCallback = React.useCallback(() => {
    const selectedRows = tableRef.current?.api.getSelectedRows();
    onSelectionChanged?.(selectedRows);
  }, [onSelectionChanged, tableRef]);

  const getRowStyle = (params: RowClassParams<any, any>) => {
    const isLastRow = params.node.rowIndex === data.length - 1;
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
        rowData={data}
        columnDefs={columns}
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
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={60}
              height={60}
              color={'#6c6c6c'}
              fill={'none'}
            >
              <path
                d="M12 22C11.1818 22 10.4002 21.6708 8.83693 21.0123C4.94564 19.3734 3 18.5539 3 17.1754V7.54234M12 22C12.8182 22 13.5998 21.6708 15.1631 21.0123C19.0544 19.3734 21 18.5539 21 17.1754V7.54234M12 22V12.0292M21 7.54234C21 8.15478 20.1984 8.54152 18.5953 9.315L15.6741 10.7244C13.8712 11.5943 12.9697 12.0292 12 12.0292M21 7.54234C21 6.9299 20.1984 6.54316 18.5953 5.76969L17 5M3 7.54234C3 8.15478 3.80157 8.54152 5.40472 9.315L8.32592 10.7244C10.1288 11.5943 11.0303 12.0292 12 12.0292M3 7.54234C3 6.9299 3.80157 6.54317 5.40472 5.76969L7 5M6 13.0263L8 14.0234"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 2L12 4M12 4L14 6M12 4L10 6M12 4L14 2"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            <p className="fw-semibold">No data available!</p>
          </div>
        )}
      />
    </div>
  );
}

export default React.memo(Table);
