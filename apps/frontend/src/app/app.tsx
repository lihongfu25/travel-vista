import { getToken, theme } from '@frontend/configuration';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AdminLayout,
  DashboardComponent,
  MenuComponent,
  MenuDetailComponent,
} from './admin';
import * as SettingComponent from './admin/setting';
import { useAuthActon } from './auth/action';
import Login from './auth/login/login';
import Register from './auth/register/register';
import { getUserState } from './reduxs/user/user';
import { AdminGuard, UnauthenticatedGuard } from './routing-guard';

export function App() {
  const { fetchCurrentUser } = useAuthActon();
  const user = useSelector(getUserState, shallowEqual);
  React.useEffect(() => {
    if (isEmpty(user)) {
      const token = getToken();
      if (token) {
        fetchCurrentUser();
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
        <Routes>
          <Route path="/auth/*" element={<UnauthenticatedGuard />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<Login />} />
          </Route>
          <Route
            path="/admin/*"
            element={
              <AdminGuard>
                <AdminLayout />
              </AdminGuard>
            }
          >
            <Route index element={<DashboardComponent />} />
            <Route path="menu/*">
              <Route index element={<MenuComponent />} />
              <Route path=":id" element={<MenuDetailComponent />} />
            </Route>
            <Route path="setting/*">
              <Route index element={<SettingComponent.Home />} />
            </Route>
            <Route path="*" element={<DashboardComponent />} />
          </Route>
          <Route
            path="/page-2"
            element={
              <div>
                This is the generated root route.{' '}
                <Link to="/admin">Click here for page 2.</Link>
              </div>
            }
          />
        </Routes>
        <ToastContainer />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
