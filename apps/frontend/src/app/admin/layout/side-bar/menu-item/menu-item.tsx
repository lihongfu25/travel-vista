import { Icon } from '@frontend/components';
import { MenuItem as MenuItemModel } from '@frontend/model';
import { Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AccordionMenuItem from '../accordion-menu-item/accordion-menu-item';
import styles from './menu-item.module.scss';

/* eslint-disable-next-line */
export interface MenuItemProps {
  index: number;
  data: MenuItemModel;
  expandedId: string | number | null;
  onClick: (params: MenuItemModel) => void;
}

export function MenuItem({ index, data, expandedId, onClick }: MenuItemProps) {
  /* eslint-disable-next-line */
  const { isCollapsed } = useSelector((state: any) => state.adminLayout);
  return data.children && data.children.length > 0 ? (
    <AccordionMenuItem
      index={index}
      data={data}
      expandedId={expandedId}
      onClick={onClick}
    >
      {data.children.map((item, idx) => (
        <MenuItem
          index={idx}
          key={item.id}
          data={item}
          onClick={onClick}
          expandedId={expandedId}
        />
      ))}
    </AccordionMenuItem>
  ) : (
    <Link to={data.link} className="text-decoration-none text-black">
      <Tooltip
        title={isCollapsed && !data.parentId ? data.label : ''}
        placement="right"
        arrow
      >
        <div
          className={`${styles.menu__item} ${
            isCollapsed ? styles.collapsed : ''
          } ${index !== 0 ? 'mt-1' : ''}`}
        >
          {data.icon && (
            <div className={styles.menu__item__icon}>
              <Icon src={data.icon} />
            </div>
          )}
          <Typography className={`${styles.menu__item__name}`}>
            {data.label}
          </Typography>
        </div>
      </Tooltip>
    </Link>
  );
}

export default MenuItem;
