import React from 'react';
import styles from './breadcrumb.module.scss';
import Icon from '../icon/icon';
import { ArrowLeftIcon, HomeIcon } from '../constants';
import { Link } from 'react-router-dom';

export interface IBreadcrumb {
  label: string;
  link: string;
  isOrigin?: boolean;
}

export interface BreadcrumbProps {
  breadcrumbs: IBreadcrumb[];
}

export function BreadcrumbComponent({ breadcrumbs }: BreadcrumbProps) {
  return (
    <div
      className={`${styles.container} ${
        breadcrumbs.length === 0 && styles.empty
      }`}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <>
          {breadcrumb.isOrigin ? (
            <Link to={breadcrumb.link} className={styles.breadcrumb}>
              <Icon src={HomeIcon} size={24} />
            </Link>
          ) : index === breadcrumbs.length - 1 ? (
            <div
              className={`${styles.breadcrumb} ${styles.current}`}
              key={index}
            >
              {breadcrumb.label}
            </div>
          ) : (
            <Link
              to={breadcrumb.link}
              className={styles.breadcrumb}
              key={index}
            >
              {breadcrumb.label}
            </Link>
          )}
          {index === breadcrumbs.length - 1 ? null : (
            <div className={styles.divider}>
              <Icon src={ArrowLeftIcon} size={16} />
            </div>
          )}
        </>
      ))}
    </div>
  );
}

export default React.memo(BreadcrumbComponent);
