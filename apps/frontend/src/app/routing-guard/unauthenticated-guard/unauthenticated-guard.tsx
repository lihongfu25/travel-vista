import { shallowEqual, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { isAdmin, isUserAuthenticated } from '../../reduxs/user/user';

export function UnauthenticatedGuard() {
  const userIsAdmin = useSelector(isAdmin, shallowEqual);
  const userIsLoggedIn = useSelector(isUserAuthenticated, shallowEqual);
  if (userIsAdmin) return <Navigate to="/admin" />;
  if (userIsLoggedIn) return <Navigate to="/" />;

  return <Outlet />;
}

export default UnauthenticatedGuard;
