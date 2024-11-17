import { Typography } from '@mui/material';
import styles from './menu-item.module.scss';
import { Link } from 'react-router-dom';
import { MenuItem as MenuItemModel } from '@frontend/model';
import { Icon } from '@frontend/components';
import { useSelector } from 'react-redux';

/* eslint-disable-next-line */
export interface MenuItemProps {
  data: MenuItemModel;
}

export function MenuItem({ data }: MenuItemProps) {
  const { isCollapsed } = useSelector((state: any) => state.layout);
  return (
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
