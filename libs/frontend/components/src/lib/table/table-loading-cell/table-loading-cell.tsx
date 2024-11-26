import styles from './table-loading-cell.module.scss';

/* eslint-disable-next-line */
export interface TableLoadingCellProps {}

export function TableLoadingCell(props: TableLoadingCellProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        className={styles.skeleton_shimmer}
        style={{
          height: '50%',
          borderRadius: '4px',
          width: '100%',
          margin: 'auto',
        }}
      ></div>
    </div>
  );
}

export default TableLoadingCell;
