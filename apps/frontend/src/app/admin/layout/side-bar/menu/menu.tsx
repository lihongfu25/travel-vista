import { Http, showToast } from '@frontend/common';
import { MenuItem } from '@frontend/model';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MenuItemComponent from '../menu-item/menu-item';
import styles from './menu.module.scss';

/* eslint-disable-next-line */
export interface MenuProps {}

export function Menu(props: MenuProps) {
  const [menu, setMenu] = React.useState<Array<MenuItem>>([]);
  const [expandedId, setExpandedId] = React.useState<number | null>(null);

  const http = React.useMemo(() => new Http(), []);
  const { t } = useTranslation();

  const nestMenuItems = (flatData: MenuItem[]): MenuItem[] => {
    const itemMap = new Map<number, MenuItem>();
    const nestedData: MenuItem[] = [];

    flatData.forEach((item) => {
      item.children = [];
      itemMap.set(item.id, item);
    });

    flatData.forEach((item) => {
      if (item.parentId === null) {
        nestedData.push(item);
      } else {
        const parent = itemMap.get(item.parentId);
        if (parent) {
          parent.children.push(item);
        }
      }
    });

    return nestedData;
  };

  const getMyMenu = async () => {
    try {
      const { data } = await http.get('menu-item/my-menu');
      const nestedData = nestMenuItems(data.data);
      setMenu(nestedData);
      /* eslint-disable-next-line */
    } catch (error: any) {
      if (error?.response?.data?.message) {
        showToast(t(error?.response?.data?.message), 'error');
      }
    }
  };

  React.useEffect(() => {
    getMyMenu();
    /* eslint-disable-next-line */
  }, []);

  const onExpand = (item: MenuItem) => {
    expandedId === item.id ? setExpandedId(null) : setExpandedId(item.id);
  };

  return (
    <div className={styles.menu}>
      {menu?.map((item, index) => (
        <MenuItemComponent
          key={item.id}
          index={index}
          data={item}
          onClick={onExpand}
          expandedId={expandedId}
        />
      ))}
    </div>
  );
}

export default Menu;
