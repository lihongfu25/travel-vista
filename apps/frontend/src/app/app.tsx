import { BannerSlider } from '@frontend/components';
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
import { useAuthActon } from './auth/action';
import Login from './auth/login/login';
import Register from './auth/register/register';
import { getUserState } from './reduxs/user/user';
import { AdminGuard, UnauthenticatedGuard } from './routing-guard';

export function App() {
  const [data, setData] = React.useState([
    {
      image:
        'https://media.vov.vn/sites/default/files/styles/large_watermark/public/2021-01/1_161.jpg',
      title: 'núi Muối',
      description:
        'núi Muối là một trong những nơi đẹp bậc nhất để ngắm biển mây và đón bình minh',
      link: '/page-2?name=nuimuoi',
    },
    {
      image:
        'https://media.vov.vn/sites/default/files/styles/large_watermark/public/2021-01/3_97.jpg',
      title: 'Ky Quan San',
      description:
        'Hành trình chinh phục đỉnh Ky Quan San khá nhọc nhằn, nhưng đến điểm ngắm bình minh ở núi Muối thì chưa phải trải qua những đoạn đường đốc cao, vách đá cheo leo',
    },
    {
      image:
        'https://media.baosonla.org.vn/public/khanhhb/2023-12-08/z4947662991547_0dc72032ad508e18c108cba0b9ec4021.jpg',
      title: 'Tà Xùa',
      description: 'Ngắm nhìn "biển mây" lúc hoàng hôn tại xã Tà Xùa.',
    },
    {
      image:
        'https://lh5.googleusercontent.com/5nwNSMG2KzcHlGb2ZfKCUxHk6M_1mDubdpgPsqBj1bnzhsgHCQ22h14K_FhelX-p2aHDxjoBCO1sf3AiEWmHSynnmXIJ607-8-uUWitGWmQS4DzgkS_RSxKlUebLCDjn21VrWkxw',
      title: 'Đồi chè Tam Cốc',
      description: 'Săn mây ở đồi chè Tam Cốc',
    },
    {
      image: 'https://i.ibb.co/RNkk6L0/img6.jpg',
      title: 'Đồi chè Tam Cốc',
      description: 'Săn mây ở đồi chè Tam Cốc',
    },
    {
      image: 'https://i.ibb.co/jTQfmTq/img5.jpg',
      title: 'Đồi chè Tam Cốc',
      description: 'Săn mây ở đồi chè Tam Cốc',
    },
  ]);
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
            <Route path="*" element={<DashboardComponent />} />
          </Route>
          <Route
            path="/"
            element={
              <BannerSlider
                data={data}
                width="100%"
                height="800px"
                itemWidth="330px"
                itemHeight="500px"
                autoplay
                mouseOverPause
                disableNavigation
              />
            }
          />
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
