import { Http } from '@frontend/common';
import { environment, removeToken, setToken } from '@frontend/configuration';
import { Role } from '@frontend/model';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearUser, setUser } from '../../reduxs/user/user';
import { persistor } from '../../reduxs/store';
export const useAuthActon = () => {
  const http = new Http();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loginSuccess = async (token: string) => {
    setToken(token);
    fetchCurrentUser();
  };

  const logout = async () => {
    removeToken();
    dispatch(clearUser());
    persistor.purge();
    const breadcumbs = location.pathname.split('/');
    if (breadcumbs.includes('admin') || breadcumbs.includes('user')) {
      navigate('/auth/login');
    } else {
      navigate(location.pathname);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await http.get('user/my-profile');
      const currentUser = response.data.data;

      dispatch(setUser(currentUser));
      redirect(currentUser.roles);
      /* eslint-disable-next-line */
    } catch (error: any) {
      handleError(error);
    }
  };

  const redirect = (currentRoles: Role[]) => {
    const isAuthPath = location.pathname.includes('auth');
    const isAdminPath = location.pathname.includes('admin');

    const manageRoles = new Set(environment.manage);

    if (isAuthPath) {
      if (currentRoles.some(({ slug }) => manageRoles.has(slug))) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }

    if (
      currentRoles.every(({ slug }) => !manageRoles.has(slug)) &&
      isAdminPath
    ) {
      navigate('/');
    }
  };

  /* eslint-disable-next-line */
  const handleError = (error: any) => {
    if (error?.response?.status === 401) {
      removeToken();
      const isAdminOrUserPath =
        location.pathname.includes('admin') ||
        location.pathname.includes('user');

      // navigate(isAdminOrUserPath ? '/auth/login' : location.pathname);
    }
  };

  return {
    loginSuccess,
    logout,
    fetchCurrentUser,
    redirect,
  };
};
