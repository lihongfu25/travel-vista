import {
  DatetimePickerControl,
  ImageUploadControl,
  PasswordControl,
  SelectControl,
  TextControl,
} from '@frontend/components';
import { useForm } from 'react-hook-form';
import styles from './login.module.scss';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: '',
      password: '',
      gender: null,
      dob: null,
      image: null,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
                <SelectControl
                  name="gender"
                  control={control}
                  label="Giới tính"
                  className="mb-4"
                  validates={{ required: 'This field is required' }}
                  errors={errors.gender}
                  options={[
                    { label: 'Nam', value: 1 },
                    { label: 'Nữ', value: 0 },
                  ]}
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
                <button>{t('auth.login.title')}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
