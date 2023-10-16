import { useTranslation } from 'react-i18next';

export const useValidators = () => {
  const { t } = useTranslation();

  return {
    required: { required: t('form.validators.required') },
    email: {
      pattern: /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/,
      message: t('form.validators.email'),
    },
  };
};
