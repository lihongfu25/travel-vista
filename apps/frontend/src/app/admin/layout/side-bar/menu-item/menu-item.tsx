import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import styles from './menu-item.module.scss';
import { Link } from 'react-router-dom';
import { MenuItem as MenuItemModel } from '@frontend/model';
import { Icon } from '@frontend/components';
import { useSelector } from 'react-redux';

const ArrowDownIcon = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
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
export interface MenuItemProps {
  data: MenuItemModel;
}

export function MenuItem({ data }: MenuItemProps) {
  /* eslint-disable-next-line */
  const { isCollapsed } = useSelector((state: any) => state.layout);
  return data.children && data.children.length > 0 ? (
    <Accordion disableGutters elevation={0}>
      <AccordionSummary
        expandIcon={<Icon src={ArrowDownIcon} />}
        className={`${styles.menu__item} ${
          isCollapsed ? styles.collapsed : ''
        }`}
        sx={{
          '.MuiAccordionSummary-content': {
            margin: 0,
          },
        }}
      >
        <div className={styles.menu__item__icon}>
          <Icon src={data.icon} />
        </div>
        <Typography className={`${styles.menu__item__name}`}>
          {data.label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>
    </Accordion>
  ) : (
    <Link to={data.link} className="text-decoration-none text-black">
      <div
        className={`${styles.menu__item} ${
          isCollapsed ? styles.collapsed : ''
        }`}
      >
        <div className={styles.menu__item__icon}>
          <Icon src={data.icon} />
        </div>
        <Typography className={`${styles.menu__item__name}`}>
          {data.label}
        </Typography>
      </div>
    </Link>
  );
}

export default MenuItem;
