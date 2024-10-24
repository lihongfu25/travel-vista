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
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  React.useEffect(() => {
    const checkPermission = async () => {
      if (user) {
        const userRoles = user.roles.map((role: Role) => role.slug);
        if (!userRoles.includes('superadmin') && !userRoles.includes('admin')) {
          navigate('/');
        } else {
          setHasPermission(true);
        }
      }
    };
    checkPermission();
  }, [hasPermission, user, navigate]);

  if (hasPermission) {
    return (
      <div
        className={`${styles['admin']} d-flex position-fixed top-0 bottom-0 start-0 end-0`}
      >
        <SideBar />
        <ContentPanel />
      </div>
    );
  }
}

export default React.memo(AdminLayout);
