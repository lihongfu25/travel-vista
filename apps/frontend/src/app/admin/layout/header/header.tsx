import { showToast } from '@frontend/common';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Logout from '@mui/icons-material/Logout';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  Avatar,
  Drawer,
  IconButton,
  ListItemIcon,
  Button as MuiButton,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { styled } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthActon } from '../../../auth/action';
import { setCollapsed } from '../../../reduxs/admin-layout/admin-layout';
import styles from './header.module.scss';
import { Icon } from '@frontend/components';
/* eslint-disable-next-line */
import i18n from '@i18n';
/* eslint-disable-next-line */
export interface HeaderProps {}

const CollapseIcon = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
  >
    <path
      d="M22 6C22 4.59987 22 3.8998 21.7275 3.36502C21.4878 2.89462 21.1054 2.51217 20.635 2.27248C20.1002 2 19.4001 2 18 2C16.5999 2 15.8998 2 15.365 2.27248C14.8946 2.51217 14.5122 2.89462 14.2725 3.36502C14 3.8998 14 4.59987 14 6V18C14 19.4001 14 20.1002 14.2725 20.635C14.5122 21.1054 14.8946 21.4878 15.365 21.7275C15.8998 22 16.5999 22 18 22C19.4001 22 20.1002 22 20.635 21.7275C21.1054 21.4878 21.4878 21.1054 21.7275 20.635C22 20.1002 22 19.4001 22 18V6Z"
      stroke="currentColor"
      stroke-width="1.5"
    />
    <path
      d="M6 12H14M6 12C6 11.2998 7.9943 9.99153 8.5 9.5M6 12C6 12.7002 7.9943 14.0085 8.5 14.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 22C5.66111 22 4.49167 22 3.63789 21.4635C3.19267 21.1838 2.81621 20.8073 2.53647 20.3621C2 19.5083 2 18.3389 2 16V8C2 5.66111 2 4.49167 2.53647 3.63789C2.81621 3.19267 3.19267 2.81621 3.63789 2.53647C4.49167 2 5.66111 2 8 2"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>`;

const ExpandIcon = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
  >
    <path
      d="M2 6C2 4.59987 2 3.8998 2.27248 3.36502C2.51217 2.89462 2.89462 2.51217 3.36502 2.27248C3.8998 2 4.59987 2 6 2C7.40013 2 8.1002 2 8.63498 2.27248C9.10538 2.51217 9.48783 2.89462 9.72752 3.36502C10 3.8998 10 4.59987 10 6V18C10 19.4001 10 20.1002 9.72752 20.635C9.48783 21.1054 9.10538 21.4878 8.63498 21.7275C8.1002 22 7.40013 22 6 22C4.59987 22 3.8998 22 3.36502 21.7275C2.89462 21.4878 2.51217 21.1054 2.27248 20.635C2 20.1002 2 19.4001 2 18V6Z"
      stroke="currentColor"
      stroke-width="1.5"
    />
    <path
      d="M16 22C18.3389 22 19.5083 22 20.3621 21.4635C20.8073 21.1838 21.1838 20.8073 21.4635 20.3621C22 19.5083 22 18.3389 22 16V8C22 5.66111 22 4.49167 21.4635 3.63789C21.1838 3.19267 20.8073 2.81621 20.3621 2.53647C19.5083 2 18.3389 2 16 2"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M18 12H10M18 12C18 11.2998 16.0057 9.99153 15.5 9.5M18 12C18 12.7002 16.0057 14.0085 15.5 14.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`;

const NotificationIcon = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
  >
    <path
      d="M5.15837 11.491C5.08489 12.887 5.16936 14.373 3.92213 15.3084C3.34164 15.7438 3 16.427 3 17.1527C3 18.1508 3.7818 19 4.8 19H19.2C20.2182 19 21 18.1508 21 17.1527C21 16.427 20.6584 15.7438 20.0779 15.3084C18.8306 14.373 18.9151 12.887 18.8416 11.491C18.6501 7.85223 15.6438 5 12 5C8.35617 5 5.34988 7.85222 5.15837 11.491Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.5 3.125C10.5 3.95343 11.1716 5 12 5C12.8284 5 13.5 3.95343 13.5 3.125C13.5 2.29657 12.8284 2 12 2C11.1716 2 10.5 2.29657 10.5 3.125Z"
      stroke="currentColor"
      stroke-width="1.5"
    />
    <path
      d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`;

const StyledIconButton = styled(IconButton)`
  & {
    padding: 4px;
    border-radius: 8px;
  }
`;
const StyledButton = styled(MuiButton)({
  color: 'rgba(0, 0, 0, 0.75)',
  marginLeft: '2rem',
  fontSize: '1.5rem',
  padding: 0,
  '&:hover': {
    backgroundColor: '#fff',
  },
  '&:active': {
    backgroundColor: '#fff',
  },
});
const StyledLanguageMenuItem = styled(MuiMenuItem)({
  minWidth: '160px',
});
const StyledUserMenuItem = styled(MuiMenuItem)({
  minWidth: '220px',
  fontSize: '16px',
});
const StyledLanguageMenu = styled(MuiMenu)({});
const StyledUserMenu = styled(MuiMenu)({});
const StyledNotificationMenu = styled(MuiMenu)({});

export function Header(props: HeaderProps) {
  /* eslint-disable-next-line */
  const { isCollapsed } = useSelector((state: any) => state.layout);
  /* eslint-disable-next-line */
  const user = useSelector((state: any) => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [language, setLanguage] = React.useState<string | null>(
    localStorage.getItem('lang') || 'vi'
  );
  const [userMenuAnchorEl, setUserMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [notificationMenuAnchorEl, setNotificationMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const authActions = useAuthActon();

  const handleCollapseSideBar = () => {
    dispatch(setCollapsed(!isCollapsed));
    if (isCollapsed) {
      localStorage.removeItem('isCollapsed');
    } else {
      localStorage.setItem('isCollapsed', 'true');
    }
  };

  const handleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event as React.KeyboardEvent).key === 'Tab'
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };
  const handleOpenLanguageMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setLanguageMenuAnchorEl(event.currentTarget);
  };
  const handleCloseLanguageMenu = () => {
    setLanguageMenuAnchorEl(null);
  };
  const handleChooseLanguage = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem('lang', language);
    handleCloseLanguageMenu();
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setUserMenuAnchorEl(null);
  };
  const handleOpenNotificationMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setNotificationMenuAnchorEl(event.currentTarget);
  };
  const handleCloseNotificationMenu = () => {
    setNotificationMenuAnchorEl(null);
  };

  const logout = () => {
    authActions.logout();
    handleCloseUserMenu();
    showToast(t('notification.logout'), 'success');
  };

  return (
    <>
      <div
        className={`${styles['header']} d-flex justify-content-between align-items-center`}
      >
        <div className={`${styles['header__left']}`}>
          <StyledIconButton
            onClick={handleCollapseSideBar}
            className={`${styles['header__left__collapse']}`}
          >
            <Icon src={isCollapsed ? ExpandIcon : CollapseIcon} />
          </StyledIconButton>
          <StyledIconButton
            onClick={handleDrawer(true)}
            className={`${styles['header__left__drawer']}`}
          >
            <MenuRoundedIcon
              sx={{
                fontSize: '2.75rem',
              }}
            />
          </StyledIconButton>
          <StyledButton
            id="select-language-button"
            aria-controls={languageMenuAnchorEl ? 'language-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={languageMenuAnchorEl ? 'true' : undefined}
            onClick={handleOpenLanguageMenu}
            endIcon={<KeyboardArrowDownRoundedIcon />}
            disableRipple
          >
            {language}
          </StyledButton>
        </div>
        <div className={`${styles['header__right']}`}>
          <IconButton
            id="open-notification-button"
            aria-controls={
              notificationMenuAnchorEl ? 'notification-menu' : undefined
            }
            aria-haspopup="true"
            aria-expanded={notificationMenuAnchorEl ? 'true' : undefined}
            onClick={handleOpenNotificationMenu}
            sx={{
              marginRight: '1rem',
            }}
          >
            <Icon src={NotificationIcon} />
          </IconButton>
          <IconButton
            id="select-user-button"
            aria-controls={userMenuAnchorEl ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={userMenuAnchorEl ? 'true' : undefined}
            sx={{
              padding: 0,
            }}
            onClick={handleOpenUserMenu}
          >
            <Avatar
              sx={{ bgcolor: deepOrange[500], width: 36, height: 36 }}
              alt={user ? (user.firstName ? user.firstName : user.email) : ''}
              src={user && user.image}
            >
              {user
                ? user.firstName
                  ? user.firstName['0']
                  : user.email['0']
                : ''}
            </Avatar>
          </IconButton>
        </div>
      </div>
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawer(false)}>
        <div className={`${styles['drawer']}`}></div>
      </Drawer>
      <StyledLanguageMenu
        id="language-menu"
        anchorEl={languageMenuAnchorEl}
        open={Boolean(languageMenuAnchorEl)}
        onClose={handleCloseLanguageMenu}
        MenuListProps={{
          'aria-labelledby': 'select-language-button',
        }}
      >
        <StyledLanguageMenuItem onClick={() => handleChooseLanguage('vi')}>
          {t('language.vi')}
        </StyledLanguageMenuItem>
        <StyledLanguageMenuItem onClick={() => handleChooseLanguage('en')}>
          {t('language.en')}
        </StyledLanguageMenuItem>
      </StyledLanguageMenu>
      <StyledUserMenu
        anchorEl={userMenuAnchorEl}
        id="user-menu"
        open={Boolean(userMenuAnchorEl)}
        onClose={handleCloseUserMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <StyledUserMenuItem onClick={handleCloseUserMenu}>
          <Avatar /> {t('menu.profile')}
        </StyledUserMenuItem>
        {/* <Divider /> */}
        <StyledUserMenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('menu.logout')}
        </StyledUserMenuItem>
      </StyledUserMenu>
      <StyledNotificationMenu
        anchorEl={notificationMenuAnchorEl}
        id="notification-menu"
        open={Boolean(notificationMenuAnchorEl)}
        onClose={handleCloseNotificationMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: '360px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <StyledUserMenuItem onClick={handleCloseNotificationMenu}>
          {t('menu.profile')}
        </StyledUserMenuItem>
        <StyledUserMenuItem onClick={handleCloseNotificationMenu}>
          {t('menu.profile')}
        </StyledUserMenuItem>
        {/* <Divider /> */}
        <StyledUserMenuItem onClick={handleCloseNotificationMenu}>
          {t('menu.logout')}
        </StyledUserMenuItem>
      </StyledNotificationMenu>
    </>
  );
}

export default Header;
