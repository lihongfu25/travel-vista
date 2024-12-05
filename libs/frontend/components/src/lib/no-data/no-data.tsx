import { useTranslation } from 'react-i18next';
import { NoDataIcon } from '../constants';
import Icon from '../icon/icon';
import styles from './no-data.module.scss';

/* eslint-disable-next-line */
export interface NoDataProps {
  title?: string;
  description?: string;
}

export function NoData({ title, description }: NoDataProps) {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Icon src={NoDataIcon} />
      </div>
      <div className={styles.title}>{t(title ?? 'common.noData')}</div>
      {description && (
        <div className={styles.description}>{t(description)}</div>
      )}
    </div>
  );
}

export default NoData;
