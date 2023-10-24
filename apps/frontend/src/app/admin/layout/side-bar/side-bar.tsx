import { useSelector } from 'react-redux';
import styles from './side-bar.module.scss';

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
      <h1>Bar</h1>
    </div>
  );
}

export default SideBar;
