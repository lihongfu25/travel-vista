import { Http } from '@frontend/common';
import { removeToken, setToken } from '@frontend/configuration';
import { Role } from '@frontend/model';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearUser, setUser } from '../../reduxs/user/user';
export const useAuthActon = () => {
  const http = new Http();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loginSuccess = async (token: string) => {
    setToken(token);
    fetchMyProfile();
  };

  const logOut = async () => {
    removeToken();
    dispatch(clearUser());
    const breadcumbs = location.pathname.split('/');
    if (breadcumbs.includes('admin') || breadcumbs.includes('user')) {
      navigate('/auth/login');
    } else {
      navigate(location.pathname);
    }
  };

  const fetchMyProfile = async () => {
    try {
      const res = await http.get('user/my-profile');
      const user = res.data.data;
      dispatch(setUser(user));
      const userRoles = user.roles.map((role: Role) => role.slug);
      if (userRoles.includes('superadmin') || userRoles.includes('admin')) {
        navigate('/admin');
      } else if (userRoles.includes('user')) {
        navigate('/');
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        removeToken();
        const breadcumbs = location.pathname.split('/');
        if (breadcumbs.includes('admin') || breadcumbs.includes('user')) {
          navigate('/auth/login');
        } else {
          navigate(location.pathname);
        }
      }
    }
  };

  return {
    loginSuccess,
    logOut,
    fetchMyProfile,
  };
};
