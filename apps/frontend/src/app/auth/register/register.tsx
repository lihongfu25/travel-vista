import { Http, showToast } from '@frontend/common';
import {
  Button,
  CheckboxControl,
  Icon,
  LockIcon,
  PasswordIconControl,
  TextIconControl,
  UserIcon,
} from '@frontend/components';
import { useValidators } from '@frontend/hooks';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthActon } from '../action';
import styles from './register.module.scss';

interface RegiserForm {
  email: string | undefined;
  password: string | undefined;
  confirm: string | undefined;
}

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isAgreeTerms, setIsAgreeTerms] = React.useState<boolean>(true);
  const { t } = useTranslation();
  const validators = useValidators();
  const authActions = useAuthActon();
  const http = new Http();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegiserForm>({
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  });

  const onSubmit = async (formValue: RegiserForm) => {
    if (formValue.password !== formValue.confirm) {
      setError('confirm', {
        type: 'confirmPassword',
        message: t('form.validators.confirmPassword'),
      });
      return;
    }
    setLoading(true);
    try {
      delete formValue.confirm;
      const { data } = await http.post('auth/register', formValue);
      authActions.loginSuccess(data.data.token);
      showToast(t('notification.login.success'), 'success');
      /* eslint-disable-next-line */
    } catch (error: any) {
      if (error?.response?.status === 409) {
        setError('email', {
          type: 'exist',
          message: t('form.validators.exist', { key: 'Email' }),
        });
      } else {
        showToast(t('notification.error'), 'error');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`${styles['register']} position-fixed top-0 bottom-0 start-0 end-0`}
    >
      <div className="container py-5">
        <div className="row justify-content-center py-0 py-lg-4 my-0 my-lg-2">
          <div className="col-12 col-lg-6 max-w-600">
            <div className="shadow p-4 rounded-10 bg-glass">
              <div className={`${styles['register']} px-2 mb-4`}>
                <Typography variant="h4" color="primary">
                  {t('auth.register.title')}
                </Typography>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="px-2">
                <TextIconControl
                  name="email"
                  control={control}
                  label={t('auth.register.email')}
                  className="mb-3"
                  validates={[validators.required, validators.email]}
                  errors={errors.email}
                  size="medium"
                  icon={<Icon src={UserIcon} />}
                  color="primary"
                />
                <PasswordIconControl
                  name="password"
                  control={control}
                  label={t('auth.register.password')}
                  className="mb-3"
                  validates={[validators.required, validators.minLength(6)]}
                  errors={errors.password}
                  size="medium"
                  icon={<Icon src={LockIcon} />}
                  color="primary"
                />
                <PasswordIconControl
                  name="confirm"
                  control={control}
                  label={t('auth.register.confirmPassword')}
                  className="mb-3"
                  validates={[validators.required, validators.minLength(6)]}
                  errors={errors.confirm}
                  size="medium"
                  icon={<Icon src={LockIcon} />}
                  color="primary"
                />
                <Box className="d-flex align-items-center mb-4">
                  <CheckboxControl
                    label={t('auth.register.agreeWith')}
                    color="primary"
                    checked={isAgreeTerms}
                    onChange={() => setIsAgreeTerms(!isAgreeTerms)}
                  />
                  <Link
                    to={'/auth/login'}
                    className="ms-1 text-decoration-underline-hover fw-3 color-1"
                  >
                    {t('auth.register.terms')}
                  </Link>
                </Box>
                <Button
                  variant="contained"
                  size="medium"
                  fullWidth
                  disableElevation
                  loading={loading}
                  disabled={!isAgreeTerms}
                  type="submit"
                >
                  {t('auth.register.title')}
                </Button>
              </form>

              <div className="px-2 mt-4">
                <Box className="d-flex align-items-center justify-content-center">
                  <Typography color="primary" className="me-1">
                    {t('auth.register.haveAccount')}
                  </Typography>
                  <Link
                    to={'/auth/login'}
                    className="text-decoration-underline-hover fw-3 color-1"
                  >
                    {t('auth.register.goToLogin')}
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

export default Register;
