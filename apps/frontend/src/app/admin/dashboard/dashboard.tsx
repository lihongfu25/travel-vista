import styles from './dashboard.module.scss';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function DashboardComponent(props: DashboardProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Dashboard!</h1>
    </div>
  );
}

export default DashboardComponent;
