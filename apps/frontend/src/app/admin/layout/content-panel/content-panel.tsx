import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import styles from './content-panel.module.scss';
import { useSelector } from 'react-redux';
import { BreadcrumbComponent } from '@frontend/components';

/* eslint-disable-next-line */
export interface ContentPanelProps {}

export function ContentPanel(props: ContentPanelProps) {
  /* eslint-disable-next-line */
  const { breadcrumbs } = useSelector((state: any) => state.adminLayout);
  return (
    <div
      className={`${styles['content-panel']} flex-grow-1 d-flex flex-column`}
    >
      <Header />
      <BreadcrumbComponent breadcrumbs={breadcrumbs} />
      <div
        className={`${styles.content} flex-grow-1 d-flex flex-column align-items-stretch`}
      >
        {<Outlet />}
      </div>
    </div>
  );
}

export default ContentPanel;
