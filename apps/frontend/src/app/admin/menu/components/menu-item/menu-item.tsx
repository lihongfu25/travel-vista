import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon, TableActions } from '@frontend/components';
import { ITableActionItem, MenuItem } from '@frontend/model';
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data.id,
    data: data,
  });

  const handleView = (item: MenuItem) => {
    onView('view', item);
  };

  const handleEdit = (item: MenuItem) => {
    onEdit('update', item);
  };

  const handleDelete = (item: MenuItem) => {
    onDelete(item);
  };

  const customActions: Array<ITableActionItem> = React.useMemo(() => {
    return [
      {
        label: 'Move',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={18}
            height={18}
            color="inherit"
            fill={'none'}
          >
            <path
              d="M11.9902 8.98595V3.31543"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.9902 20.6705V15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.6702 12.0001L14.9999 11.9482"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.00031 12.0001L3.33002 11.9482"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.9999 5.99998C14.9999 5.99998 12.7904 3.00001 11.9999 3C11.2093 2.99999 8.99995 6 8.99995 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.99993 15C5.99993 15 2.99996 12.7905 2.99995 12C2.99994 11.2094 5.99995 9 5.99995 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.9999 9C17.9999 9 20.9999 11.2095 20.9999 12C20.9999 12.7906 17.9999 15 17.9999 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.99995 18C8.99995 18 11.2094 21 11.9999 21C12.7905 21 14.9999 18 14.9999 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        hover: '#3B82F6',
        props: listeners,
      },
    ];
  }, []);

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        className={`${styles.menu__item} d-flex align-items-center justify-content-between px-3 py-2 gap-2 w-100`}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          zIndex: isDragging ? 5 : 'unset',
        }}
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
            customActions={customActions}
          />
        </div>
      </div>
      {data.children && data.children.length > 0 && (
        <SortableContext
          items={data.children.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className={`${styles.menu__list}`}>
            {data.children.map((item: MenuItem) => (
              <MenuItemComponent
                key={item.id}
                data={item}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </SortableContext>
      )}
    </>
  );
}

export default React.memo(MenuItemComponent);
