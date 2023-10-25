import { Typography } from '@mui/material';
import styles from './menu-item.module.scss';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface MenuItemProps {
  key: number;
  link: string;
  children: any;
}

export function MenuItem(props: MenuItemProps) {
  return (
    <Link to={props.link}>
      <div className={`${styles['menu-item']}`}>
        <Typography className={`${styles['menu-item__name']}`}>
          {props.children}
        </Typography>
      </div>
    </Link>
  );
}

export default MenuItem;
