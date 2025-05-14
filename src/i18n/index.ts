import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import arTranslation from './locales/ar.json';
import heTranslation from './locales/he.json';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: arTranslation
      },
      he: {
        translation: heTranslation
      }
    },
    lng: 'ar', // Default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;