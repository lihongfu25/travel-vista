import React from 'react';
import styles from './menu.module.scss';
import MenuItemComponent from '../menu-item/menu-item';
import { Http } from '@frontend/common';
import { MenuItem } from '@frontend/model';

/* eslint-disable-next-line */
export interface MenuProps {}

export function Menu(props: MenuProps) {
  const [menu, setMenu] = React.useState<Array<MenuItem>>([]);

  const http = React.useMemo(() => new Http(), []);

  const getMyMenu = async () => {
    try {
      const { data } = await http.get('menu-item/my-menu');
      setMenu(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getMyMenu();
  }, []);
  return (
    <div className={styles.menu}>
      {menu?.map((item) => (
        <MenuItemComponent key={item.id} data={item} />
      ))}
    </div>
  );
}

export default Menu;
