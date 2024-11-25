import { Icon } from '@frontend/components';
import { MenuItem as MenuItemModel } from '@frontend/model';
import { Menu, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './accordion-menu-item.module.scss';

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
  index: number;
  data: MenuItemModel;
  expandedId: number | string | null;
  children: React.ReactNode;
  onClick: (params: MenuItemModel) => void;
}

export function AccordionMenuItem({
  index,
  data,
  expandedId,
  children,
  onClick,
}: AccordionMenuItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  /* eslint-disable-next-line */
  const { isCollapsed } = useSelector((state: any) => state.layout);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    onClick(data);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClick(data);
  };

  return (
    <>
      <Tooltip
        title={isCollapsed && !data.parentId ? data.label : ''}
        placement="right"
        arrow
      >
        <div
          className={`${styles.menu__item} ${
            isCollapsed ? styles.collapsed : ''
          } ${expandedId === data.id ? styles.expanded : ''} ${
            index !== 0 ? 'mt-1' : ''
          }`}
          onClick={(event) =>
            isCollapsed ? handleClick(event) : onClick(data)
          }
        >
          {data.icon && (
            <div className={styles.menu__item__icon}>
              <Icon src={data.icon} />
            </div>
          )}
          <Typography className={`${styles.menu__item__name}`}>
            {data.label}
          </Typography>
          <div className={styles.menu__item__expandedIcon}>
            <Icon src={ArrowDownIcon} />
          </div>
        </div>
      </Tooltip>
      {isCollapsed ? (
        <Menu
          elevation={4}
          open={expandedId === data.id}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            '.MuiPaper-root': {
              minWidth: 240,
              borderRadius: '6px',
            },
            '.MuiList-root.MuiMenu-list': {
              padding: 0,
            },
          }}
        >
          {children}
        </Menu>
      ) : (
        <div
          className={styles.menu__accordion}
          style={{
            height: expandedId === data.id ? 52 * data.children.length : 0,
            marginTop: expandedId === data.id ? 4 : 0,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default AccordionMenuItem;
