import { useTranslation } from 'react-i18next';
import TableActionItem from '../table-action-item/table-action-item';
import styles from './table-actions.module.scss';

export interface TableActionsProps {
  /* eslint-disable-next-line */
  row?: any;
  spacing?: string;
  size?: number;
  showView?: boolean;
  /* eslint-disable-next-line */
  onView?: (params: any) => void;
  showEdit?: boolean;
  /* eslint-disable-next-line */
  onEdit?: (params: any) => void;
  showDelete?: boolean;
  /* eslint-disable-next-line */
  onDelete?: (params: any) => void;
  /* eslint-disable-next-line */
  customActions?: any[];
  /* eslint-disable-next-line */
  hover?: any;
}

export function TableActions({
  row,
  spacing = '12px',
  size = 18,
  showView,
  onView,
  showEdit,
  onEdit,
  showDelete,
  onDelete,
  customActions,
  hover,
}: TableActionsProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.actions} style={{ gap: spacing }}>
      {showView && (
        <TableActionItem
          row={row}
          tooltip={t('common.detail')}
          hover={hover?.view}
          onClick={onView}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            color={'inherit'}
            fill={'none'}
          >
            <path
              d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.992 8H12.001"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </TableActionItem>
      )}
      {showEdit && (
        <TableActionItem
          row={row}
          tooltip={t('common.edit')}
          hover={hover?.edit}
          onClick={onEdit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            color={'inherit'}
            fill={'none'}
          >
            <path
              d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </TableActionItem>
      )}
      {customActions?.length &&
        customActions.map((action) => (
          <TableActionItem
            key={action.label}
            row={row}
            tooltip={action.label}
            hover={action?.hover}
            onClick={action.onClick}
            props={action.props}
          >
            {action.icon}
          </TableActionItem>
        ))}
      {showDelete && (
        <TableActionItem
          row={row}
          tooltip={t('common.delete')}
          hover={hover?.delete}
          onClick={onDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            color={'inherit'}
            fill={'none'}
          >
            <path
              d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M9.5 16.5L9.5 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M14.5 16.5L14.5 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </TableActionItem>
      )}
    </div>
  );
}

export default TableActions;
