import { Icon } from '@frontend/components';
import { MenuItem as MenuItemModel } from '@frontend/model';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import styles from './accordion-menu-item.module.scss';
import React from 'react';

const ArrowDownIcon = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    color="inherit"
    fill="none"
  >
    <path
      d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`;

/* eslint-disable-next-line */
export interface AccordionMenuItemProps {
  data: MenuItemModel;
  expandedId: number | string | null;
  children: React.ReactNode;
  onClick: (params: MenuItemModel) => void;
}

export function AccordionMenuItem({
  data,
  expandedId,
  children,
  onClick,
}: AccordionMenuItemProps) {
  const [contentHeight, setContentHeight] = React.useState(0);
  /* eslint-disable-next-line */
  const { isCollapsed } = useSelector((state: any) => state.layout);
  const contentRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight); // Lấy chiều cao thật của nội dung
    }
  }, [children]);
  return (
    <>
      <div
        className={`${styles.menu__item} ${
          isCollapsed ? styles.collapsed : ''
        } ${expandedId === data.id ? styles.expanded : ''}`}
        onClick={() => onClick(data)}
      >
        <div className={styles.menu__item__icon}>
          <Icon src={data.icon} />
        </div>
        <Typography className={`${styles.menu__item__name}`}>
          {data.label}
        </Typography>
        <div className={styles.menu__item__expandedIcon}>
          <Icon src={ArrowDownIcon} />
        </div>
      </div>
      <div
        className={styles.menu__accordion}
        style={{ height: expandedId === data.id ? contentHeight : 0 }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </>
  );
}

export default AccordionMenuItem;
