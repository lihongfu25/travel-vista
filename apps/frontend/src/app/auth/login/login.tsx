import { useForm } from 'react-hook-form';
import styles from './login.module.scss';
import { SelectField, TextControl, TextField } from '@frontend/components';
/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: '',
      password: '',
      age: null,
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
                  className="w-100 mb-4"
                  validates={{ required: 'This field is required' }}
                  errors={errors.user}
                />
                <TextControl
                  name="password"
                  control={control}
                  type="password"
                  label="Password"
                  className="w-100 mb-4"
                  validates={{ required: 'This field is required' }}
                  errors={errors.password}
                />
                <SelectField
                  name="age"
                  control={control}
                  label="Age"
                  className="w-100 mb-4"
                  validates={{ required: 'This field is required' }}
                  errors={errors.age}
                />
                <button>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
