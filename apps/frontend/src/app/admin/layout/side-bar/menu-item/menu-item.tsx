import { Icon } from '@frontend/components';
import { MenuItem as MenuItemModel } from '@frontend/model';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AccordionMenuItem from '../accordion-menu-item/accordion-menu-item';
import styles from './menu-item.module.scss';

/* eslint-disable-next-line */
export interface MenuItemProps {
  data: MenuItemModel;
  expandedId: string | number | null;
  onClick: (params: MenuItemModel) => void;
}

export function MenuItem({ data, expandedId, onClick }: MenuItemProps) {
  /* eslint-disable-next-line */
  const { isCollapsed } = useSelector((state: any) => state.layout);
  return data.children && data.children.length > 0 ? (
    <AccordionMenuItem data={data} expandedId={expandedId} onClick={onClick}>
      {data.children.map((item) => (
        <MenuItem
          key={item.id}
          data={item}
          onClick={onClick}
          expandedId={expandedId}
        />
      ))}
    </AccordionMenuItem>
  ) : (
    <Link to={data.link} className="text-decoration-none text-black">
      <div
        className={`${styles.menu__item} ${
          isCollapsed ? styles.collapsed : ''
        }`}
      >
        <div className={styles.menu__item__icon}>
          <Icon src={data.icon} />
        </div>
        <Typography className={`${styles.menu__item__name}`}>
          {data.label}
        </Typography>
      </div>
    </Link>
  );
}

export default MenuItem;
