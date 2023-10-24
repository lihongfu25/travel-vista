import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import styles from './content-panel.module.scss';

/* eslint-disable-next-line */
export interface ContentPanelProps {}

export function ContentPanel(props: ContentPanelProps) {
  return (
    <div
      className={`${styles['content-panel']} flex-grow-1 d-flex flex-column`}
    >
      <Header />
      <div className="content flex-grow-1">{<Outlet />}</div>
    </div>
  );
}

export default ContentPanel;
