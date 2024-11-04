import { shallowEqual, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isAdmin, isUserAuthenticated } from '../../reduxs/user/user';

export interface AdminGuardProps {
  children?: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const userIsAdmin = useSelector(isAdmin, shallowEqual);
  const userIsAuthenticated = useSelector(isUserAuthenticated, shallowEqual);

  if (userIsAdmin) {
    return children;
  }

  return userIsAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/auth/login" />
  );
}

export default AdminGuard;
