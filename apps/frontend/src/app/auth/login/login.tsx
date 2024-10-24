import { Http, showToast } from '@frontend/common';
import {
  Button,
  CheckboxControl,
  PasswordIconControl,
  TextIconControl,
} from '@frontend/components';
import { useValidators } from '@frontend/hooks';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { Box, Divider, Typography } from '@mui/material';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuthActon } from '../action';

import { environment } from '@frontend/configuration';
import { Link } from 'react-router-dom';
import styles from './login.module.scss';
export function Login() {
  const [loading, setLoading] = React.useState(false);
  const [firebaseApp, setFirebaseApp] = React.useState<FirebaseApp>(
    initializeApp(environment.firebaseConfig)
  );
  const [loginGateways, setLoginGateways] = React.useState<Array<string>>([]);
  const { t } = useTranslation();
  const validators = useValidators();
  const authActions = useAuthActon();
  const http = new Http();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: 'admin@app.com.vn',
      password: 'secret',
      remember: false,
    },
  });

  React.useEffect(() => {
    const fetchLoginGateways = async () => {
      const { data } = await http.get('setting/login-gateway');
      setLoginGateways(data.data);
    };
    fetchLoginGateways();
  }, []);

  const onSubmit = async (formValue: any) => {
    setLoading(true);
    try {
      const { data } = await http.post('auth/login', formValue);
      authActions.loginSuccess(data.data.token);
      showToast(t('notification.login.success'), 'success');
    } catch (error: any) {
      if (error?.response?.status === 403)
        showToast(t('notification.login.error403'), 'error');
      else if (error?.response?.status === 404)
        showToast(t('notification.login.error404'), 'error');
      else {
        showToast(t('notification.error'), 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    const auth = getAuth(firebaseApp);
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();
        const { data } = await http.post('auth/login-firebase', {
          token: token,
        });
        authActions.loginSuccess(data.data.token);
        showToast(t('notification.login.success'), 'success');
      })
      .catch((error) => {
        showToast(t('notification.error'), 'error');
      });
  };

  const loginWithFacebook = () => {
    const auth = getAuth(firebaseApp);
    const facebookProvider = new FacebookAuthProvider();

    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();
        const { data } = await http.post('auth/login-firebase', {
          token: token,
        });
        authActions.loginSuccess(data.data.token);
        showToast(t('notification.login.success'), 'success');
      })
      .catch((error) => {
        showToast(t('notification.error'), 'error');
      });
  };

  const isEnableGateway = (gateway: string) => {
    return loginGateways.includes(gateway);
  };

  return (
    <div
      className={`${styles['login']} position-fixed top-0 bottom-0 start-0 end-0`}
    >
      <div className="container py-5">
        <div className="row justify-content-center py-0 py-lg-4 my-0 my-lg-2">
          <div className="col-12 col-lg-6 max-w-600">
            <div className="shadow p-4 rounded-10 bg-glass">
              <div className={`${styles['login']} px-2 mb-4`}>
                <Typography variant="h4" color="primary">
                  {t('auth.login.title')}
                </Typography>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="px-2">
                <TextIconControl
                  name="user"
                  control={control}
                  label={t('auth.login.email')}
                  className="mb-3"
                  validates={[validators.required, validators.email]}
                  errors={errors.user}
                  size="medium"
                  icon={PersonOutlineRoundedIcon}
                  color="primary"
                />
                <PasswordIconControl
                  name="password"
                  control={control}
                  label={t('auth.login.password')}
                  className="mb-3"
                  validates={[validators.required, validators.minLength(6)]}
                  errors={errors.password}
                  size="medium"
                  icon={LockOutlinedIcon}
                  color="primary"
                />
                <Box className="d-flex justify-content-between mb-4">
                  <CheckboxControl
                    name="remember"
                    control={control}
                    label={t('auth.login.remember')}
                    color="primary"
                    className="pb-2"
                  />
                  <Link
                    to={'/auth/forget-password'}
                    className="text-decoration-underline-hover fw-3 color-1"
                  >
                    {t('auth.forgetPassword.title')}
                  </Link>
                </Box>
                <Button
                  variant="contained"
                  size="medium"
                  fullWidth
                  disableElevation
                  loading={loading}
                  type="submit"
                >
                  {t('auth.login.title')}
                </Button>
              </form>
              {isEnableGateway('google') || isEnableGateway('facebook') ? (
                <div className="px-2 mb-4">
                  <Divider className="my-4">
                    <Typography color="primary">
                      {t('auth.login.or')}
                    </Typography>
                  </Divider>
                  {isEnableGateway('google') && (
                    <Button
                      variant="outlined"
                      size="medium"
                      fullWidth
                      disableElevation
                      startIcon={<GoogleIcon />}
                      className={isEnableGateway('facebook') ? 'mb-4' : ''}
                      onClick={loginWithGoogle}
                    >
                      {t('auth.login.loginWithGoogle')}
                    </Button>
                  )}
                  {isEnableGateway('facebook') && (
                    <Button
                      variant="outlined"
                      size="medium"
                      fullWidth
                      disableElevation
                      startIcon={<FacebookIcon />}
                      onClick={loginWithFacebook}
                    >
                      {t('auth.login.loginWithFacebook')}
                    </Button>
                  )}
                </div>
              ) : null}

              <div className="px-2 mt-4">
                <Box className="d-flex align-items-center justify-content-center">
                  <Typography color="primary" className="me-1">
                    {t('auth.login.dontHaveAccount')}
                  </Typography>
                  <Link
                    to={'/auth/register'}
                    className="text-decoration-underline-hover color-1 fw-3"
                  >
                    {t('auth.login.goToRegister')}
                  </Link>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
