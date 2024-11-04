import { shallowEqual, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isUserAuthenticated } from '../../reduxs/user/user';

export interface GuardProps {
  children?: React.ReactNode;
}

export function Guard({ children }: GuardProps) {
  const userIsLoggedIn = useSelector(isUserAuthenticated, shallowEqual);

  return userIsLoggedIn ? children : <Navigate to="/auth/login" />;
}

export default Guard;
