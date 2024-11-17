import { MenuItem } from '@frontend/model';
import styles from './menu-item.module.scss';
import React from 'react';
import { Icon, TableActions } from '@frontend/components';

/* eslint-disable-next-line */
export interface MenuItemProps {
  data: MenuItem;
}

export function MenuItemComponent({ data }: MenuItemProps) {
  const handleView = (item: MenuItem) => {
    console.log('view: ', item);
  };

  const handleEdit = (item: MenuItem) => {
    console.log('edit: ', item);
  };

  const handleDelete = (item: MenuItem) => {
    console.log('delete: ', item);
  };

  return (
    <div
      className={`${styles.menu__item} d-flex align-items-center justify-content-between px-3 py-2 gap-2 w-100`}
    >
      <div className="d-flex align-items-center gap-2">
        <div className="">
          <Icon src={data.icon} />
        </div>
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
