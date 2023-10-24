import React from 'react';
import styles from './admin.module.scss';
import SideBar from './side-bar/side-bar';
import ContentPanel from './content-panel/content-panel';

/* eslint-disable-next-line */
export interface AdminProps {}

export function AdminLayout() {
  return (
    <div
      className={`${styles['admin']} d-flex position-fixed top-0 bottom-0 start-0 end-0`}
    >
      <SideBar />
      <ContentPanel />
    </div>
  );
}

export default React.memo(AdminLayout);
