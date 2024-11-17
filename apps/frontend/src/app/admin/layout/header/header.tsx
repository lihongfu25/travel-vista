import { showToast } from '@frontend/common';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Logout from '@mui/icons-material/Logout';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
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
/* eslint-disable-next-line */
import i18n from '@i18n';
/* eslint-disable-next-line */
export interface HeaderProps {}

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
  const { isCollapsed } = useSelector((state: any) => state.layout);
  const user = useSelector((state: any) => state.user);
  const [Icon, setIcon] = React.useState<any>(FullscreenExitRoundedIcon);
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

  React.useEffect(() => {
    if (isCollapsed) {
      setIcon(FullscreenRoundedIcon);
    } else {
      setIcon(FullscreenExitRoundedIcon);
    }
  }, [isCollapsed]);

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
            <Icon
              sx={{
                fontSize: '2.75rem',
              }}
            />
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
            <NotificationsNoneRoundedIcon
              sx={{
                fontSize: '2rem',
              }}
            />
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
