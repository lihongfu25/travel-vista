import { getToken, theme } from '@frontend/configuration';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthActon } from './auth/action';
import Login from './auth/login/login';
import { DashboardComponent, AdminLayout, MenuComponent } from './admin';
export function App() {
  const { fetchMyProfile } = useAuthActon();
  React.useEffect(() => {
    const token = getToken();
    if (token) {
      fetchMyProfile();
    }
    console.log('chạy nè');
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
        <Routes>
          <Route path="/auth">
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/admin/*" element={<AdminLayout />}>
            {/* <Route index element={<DashboardComponent />} /> */}
            <Route index element={<MenuComponent />} />
          </Route>
          <Route
            path="/"
            element={
              <div>
                This is the generated root route.{' '}
                <Link to="/page-2">Click here for page 2.</Link>
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
