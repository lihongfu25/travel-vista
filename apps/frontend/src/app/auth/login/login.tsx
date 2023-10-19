import { showToast } from '@frontend/common';
import { PasswordIconControl, TextIconControl } from '@frontend/components';
import { useValidators } from '@frontend/hooks';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styles from './login.module.scss';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

export function Login() {
  const [loading, setLoading] = React.useState(false);

  const { t } = useTranslation();
  const { search } = useLocation();
  const validators = useValidators();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: 'lehongphu',
      usericon: 'lehongphu',
      password: 'secret',
      gender: 1,
      dob: '02-05-2001',
      image: null,
      color: '#1a1a1a',
    },
  });

  React.useEffect(() => {
    console.log(search);
  }, [search]);

  const pagination = {
    itemCount: 1,
    totalItems: 2,
    itemsPerPage: 1,
    currentPage: 1,
    totalPages: 2,
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleShowToast = () => {
    showToast('Đăng nhập thành công', 'success');
  };

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <div
      className={`${styles['login']} position-fixed top-0 bottom-0 start-0 end-0`}
    >
      <div className="container py-5">
        <div className="row justify-content-center py-0 py-lg-4 my-0 my-lg-2">
          <div className="col-12 col-lg-6 max-w-600">
            <div className="shadow p-4 rounded-10 bg-glass">
              <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                <TextIconControl
                  name="user"
                  control={control}
                  label={t('auth.login.email')}
                  className="mb-4"
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
                  className="mb-4"
                  validates={[validators.required, validators.minLength(6)]}
                  errors={errors.password}
                  size="medium"
                  icon={LockOutlinedIcon}
                  color="primary"
                />
                {/* <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  disableElevation
                >
                  {t('auth.login.title')}
                </Button> */}
                <LoadingButton
                  size="large"
                  onClick={handleClick}
                  loading={loading}
                  variant="contained"
                  disableElevation
                  fullWidth
                >
                  <span>{t('auth.login.title')}</span>
                </LoadingButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
