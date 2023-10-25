import React from 'react';
import styles from './menu.module.scss';
import MenuItem from '../menu-item/menu-item';

/* eslint-disable-next-line */
export interface MenuProps {}

export function Menu(props: MenuProps) {
  const [menu, setMenu] = React.useState<
    Array<{ name: string; link: string; icon: string }>
  >([]);

  React.useEffect(() => {
    setMenu([
      {
        name: 'Dashboard',
        link: '/admin/dashboard',
        icon: '123',
      },
      {
        name: 'Product',
        link: '/admin/product',
        icon: '123',
      },
    ]);
  }, []);
  return (
    <div className={styles['container']}>
      {menu?.map((item, key) => (
        <MenuItem key={key} link={item.link}>
          {item.name}
        </MenuItem>
      ))}
    </div>
  );
}

export default Menu;
