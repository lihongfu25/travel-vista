import { useSelector } from 'react-redux';
import styles from './side-bar.module.scss';
import { Divider, Typography } from '@mui/material';
import Menu from './menu/menu';

/* eslint-disable-next-line */
export interface SideBarProps {}

export function SideBar(props: SideBarProps) {
  const { isCollapsed } = useSelector((state: any) => state.layout);

  return (
    <div
      className={`${styles['side-bar']} ${
        isCollapsed ? styles['collapsed'] : styles['expand']
      }`}
    >
      <div
        className={`${styles['side-bar__heading']} d-flex justify-content-center align-items-center`}
      >
        <Typography
          variant="h6"
          className={`${styles['side-bar__heading__name']}`}
        >
          Admin Dashboard
        </Typography>
      </div>
      <Divider
        sx={{
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
        }}
      />
      <div className={`${styles['side-bar__menu']}`}>
        <Menu />
      </div>
    </div>
  );
}

export default SideBar;
