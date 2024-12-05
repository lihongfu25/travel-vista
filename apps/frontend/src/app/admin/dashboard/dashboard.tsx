import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setBreadcrumb } from '../../reduxs/admin-layout/admin-layout';
import styles from './dashboard.module.scss';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function DashboardComponent(props: DashboardProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setBreadcrumb([]));
  }, [t, dispatch]);

  return (
    <div className={styles['container']}>
      <h1>Welcome to Dashboard!</h1>
    </div>
  );
}

export default DashboardComponent;
