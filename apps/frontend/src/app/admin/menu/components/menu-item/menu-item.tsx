import { Icon, TableActions } from '@frontend/components';
import { MenuItem } from '@frontend/model';
import React from 'react';
import styles from './menu-item.module.scss';

/* eslint-disable-next-line */
export interface MenuItemProps {
  data: MenuItem;
  onView: (mode: 'create' | 'update' | 'view', item?: MenuItem) => void;
  onEdit: (mode: 'create' | 'update' | 'view', item?: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

export function MenuItemComponent({
  data,
  onView,
  onEdit,
  onDelete,
}: MenuItemProps) {
  const handleView = (item: MenuItem) => {
    onView('view', item);
  };

  const handleEdit = (item: MenuItem) => {
    onEdit('update', item);
  };

  const handleDelete = (item: MenuItem) => {
    onDelete(item);
  };

  return (
    <div
      className={`${styles.menu__item} d-flex align-items-center justify-content-between px-3 py-2 gap-2 w-100`}
    >
      <div className="d-flex align-items-center gap-2">
        {data.icon && (
          <div className="">
            <Icon src={data.icon} />
          </div>
        )}
        <div className="">{data.label}</div>
      </div>
      <div className={`${styles.menu__item__actions}`}>
        <TableActions
          row={data}
          showView
          onView={handleView}
          showEdit
          onEdit={handleEdit}
          showDelete
          onDelete={handleDelete}
          hover={{
            view: '#3B82F6',
            edit: '#3B82F6',
            delete: '#EF4444',
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(MenuItemComponent);
