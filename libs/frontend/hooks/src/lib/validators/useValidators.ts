import { useTranslation } from 'react-i18next';

export const useValidators = () => {
  const { t } = useTranslation();

  return {
    required: {
      required: {
        value: true,
        message: t('form.validators.required'),
      },
    },
    email: {
      pattern: {
        value: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
        message: t('form.validators.email'),
      },
    },
    minLength: (length: number) => ({
      minLength: {
        value: length,
        message: t('form.validators.minlength', { length }),
      },
    }),
    maxLength: (length: number) => ({
      maxLength: {
        value: length,
        message: t('form.validators.maxLength', { length }),
      },
    }),
    pattern: (length: RegExp) => ({
      min: {
        value: length,
        message: t('form.validators.pattern'),
      },
    }),
  };
};
