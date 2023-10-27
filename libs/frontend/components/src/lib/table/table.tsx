import styles from './table.module.scss';
import { styled } from '@mui/system';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
/* eslint-disable-next-line */
export interface TableProps {
  columns: string[];
  data: any[];
}

const StyledHeadRow = styled(TableRow)(() => ({}));
const StyledHeadCell = styled(TableCell)(() => ({
  fontSize: '1rem',
  padding: '8px 16px',
}));

const StyledBodyRow = styled(TableRow)(() => ({}));
const StyledBodyCell = styled(TableCell)(() => ({
  fontSize: '1rem',
  padding: '8px 16px',
}));

export function Table({ columns, data }: TableProps) {
  return (
    <TableContainer className={`${styles['table']}`}>
      <MuiTable>
        <TableHead>
          <StyledHeadRow>
            {columns.map((column, index) => (
              <StyledHeadCell key={index}>{column}</StyledHeadCell>
            ))}
          </StyledHeadRow>
        </TableHead>
        <TableBody>
          {data.map((item, rowIndex) => (
            <StyledBodyRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <StyledBodyCell key={colIndex}>{item[column]}</StyledBodyCell>
              ))}
            </StyledBodyRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
