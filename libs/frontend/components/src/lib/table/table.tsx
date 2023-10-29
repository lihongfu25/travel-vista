import styles from './table.module.scss';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
/* eslint-disable-next-line */
export interface ITableColumn {
  key: string;
  label: string;
}
export interface TableProps {
  columns: ITableColumn[];
  data: any[];
  size?: 'small' | 'medium';
  actions: (row: any) => React.ReactNode;
}

export function Table({ columns, data, actions, ...props }: TableProps) {
  return (
    <TableContainer className={`${styles['table']}`}>
      <MuiTable size={props.size}>
        <TableHead>
          <TableRow>
            {columns.map((column: ITableColumn, index) => (
              <TableCell key={index}>{column.label}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column: ITableColumn, colIndex) => (
                <TableCell key={colIndex}>{item[column.key]}</TableCell>
              ))}
              <TableCell>{actions(item)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default React.memo(Table);
