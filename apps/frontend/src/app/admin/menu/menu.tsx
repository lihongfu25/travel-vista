import { Table } from '@frontend/components';
import styles from './menu.module.scss';

/* eslint-disable-next-line */
export interface MenuProps {}

export function MenuComponent(props: MenuProps) {
  const columns = ['Name', 'Age', 'Country'];
  const data = [
    { Name: 'John Doe', Age: 30, Country: 'USA' },
    { Name: 'Jane Smith', Age: 25, Country: 'Canada' },
    // Thêm dữ liệu khác ở đây
  ];

  return (
    <div className={`${styles['menu']} rounded-10`}>
      <h1>Welcome to Menu!</h1>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default MenuComponent;
