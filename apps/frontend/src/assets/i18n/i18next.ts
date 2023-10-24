// i18n.js
import { environment } from '@frontend/configuration';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import viTranslation from './locales/vi.json';

const lang = localStorage.getItem('lang') || environment.defaultLanguage;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    vi: {
      translation: viTranslation,
    },
  },
  fallbackLng: lang,
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
