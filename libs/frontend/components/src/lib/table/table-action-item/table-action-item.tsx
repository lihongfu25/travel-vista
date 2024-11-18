import { Tooltip } from '@mui/material';
import styles from './table-action-item.module.scss';
import React, { ReactElement } from 'react';

export interface TableActionItemProps {
  /* eslint-disable-next-line */
  row: any;
  tooltip?: string;
  hover?: string;
  /* eslint-disable-next-line */
  onClick?: (params: any) => void;
  children: ReactElement;
  /* eslint-disable-next-line */
  props?: any;
}

export function TableActionItem({
  row,
  hover,
  children,
  tooltip,
  onClick,
  props,
}: TableActionItemProps) {
  /* eslint-disable-next-line */
  const ref = React.useRef<any>(null);
  /* eslint-disable-next-line */
  const handleMouseEnter = (ref: any, style: string) => {
    if (ref && style) {
      ref.style.color = style;
    }
  };

  /* eslint-disable-next-line */
  const handleMouseLeave = (ref: any) => {
    if (ref) {
      ref.style.color = '#000000';
    }
  };
  return (
    <div
      ref={ref}
      className={`${styles.actions__item}`}
      onClick={() => {
        if (onClick) {
          onClick(row);
        }
      }}
      onMouseEnter={
        hover ? () => handleMouseEnter(ref.current, hover) : undefined
      }
      onMouseLeave={hover ? () => handleMouseLeave(ref.current) : undefined}
      {...props}
    >
      <Tooltip
        title={tooltip}
        placement="top"
        arrow
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -6],
                },
              },
            ],
          },
        }}
      >
        {children}
      </Tooltip>
    </div>
  );
}

export default React.memo(TableActionItem);
