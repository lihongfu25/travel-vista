import { useTranslation } from 'react-i18next';
import TableActionItem from '../table-action-item/table-action-item';
import styles from './table-actions.module.scss';
import Icon from '../../icon/icon';
import { DeleteIcon, EditIcon, InfoIcon } from '../../constants';

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
          <Icon src={InfoIcon} size={size} />
        </TableActionItem>
      )}
      {showEdit && (
        <TableActionItem
          row={row}
          tooltip={t('common.edit')}
          hover={hover?.edit}
          onClick={onEdit}
        >
          <Icon src={EditIcon} size={size} />
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
          <Icon src={DeleteIcon} size={size} />
        </TableActionItem>
      )}
    </div>
  );
}

export default TableActions;
