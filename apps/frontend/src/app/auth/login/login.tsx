import {
  AvatarUploadControl,
  ColorPickerControl,
  DatetimePickerControl,
  ImageUploadControl,
  PasswordControl,
  SimplePagination,
  SimpleSearch,
  TextControl,
} from '@frontend/components';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './login.module.scss';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { showToast } from '@frontend/common';
/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const { t } = useTranslation();
  const { search } = useLocation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      user: 'lehongphu',
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
  return (
    <div
      className={`${styles['login']} position-fixed top-0 bottom-0 start-0 end-0`}
    >
      <div className="container py-5">
        <div className="row justify-content-center py-0 py-lg-4 my-0 my-lg-2">
          <div className="col-12 col-lg-6 max-w-600">
            <div className="shadow p-4 rounded-10 bg-glass">
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextControl
                  name="user"
                  control={control}
                  label="Email"
                  className="mb-4"
                  validates={{ required: 'This field is required' }}
                  errors={errors.user}
                />
                <PasswordControl
                  name="password"
                  control={control}
                  label="Password"
                  className="mb-4"
                  validates={{ required: 'This field is required' }}
                  errors={errors.password}
                />
                <DatetimePickerControl
                  name="dob"
                  control={control}
                  label="Ngày sinh"
                  type="date"
                  className="mb-4"
                  validates={{ required: 'This field is required' }}
                  errors={errors.dob}
                />
                <ImageUploadControl
                  name="image"
                  control={control}
                  label="Ảnh đại diện"
                  className="mb-4"
                  validates={{ required: 'This field is required' }}
                  errors={errors.image}
                />
                <ColorPickerControl
                  name="color"
                  control={control}
                  label="Màu sắc"
                  className="mb-4"
                  validates={{ required: 'This field is required' }}
                  errors={errors.color}
                  defaultValue={getValues('color')}
                  showCode
                />
                <AvatarUploadControl
                  src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/03/bien-my-khe.jpg"
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                />

                <button className="mt-5">{t('auth.login.title')}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
