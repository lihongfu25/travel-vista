import React from 'react';
import styles from './admin.module.scss';
import SideBar from './side-bar/side-bar';
import ContentPanel from './content-panel/content-panel';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Role } from '@frontend/model';

/* eslint-disable-next-line */
export interface AdminProps {}

export function AdminLayout() {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    } else {
      const userRoles = user.roles.map((role: Role) => role.slug);
      if (!userRoles.includes('superadmin') && !userRoles.includes('admin')) {
        navigate('/');
      }
    }
  }, []);
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
