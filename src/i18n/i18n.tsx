import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en.json';
import ltTranslations from './locales/lt.json';

i18n.use(initReactI18next).init({
  supportedLngs: ['lt', 'en'],
  lng: 'lt',
  fallbackLng: 'lt',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslations,
    },
    lt: {
      translation: ltTranslations,
    },
  },
});

export default i18n;
