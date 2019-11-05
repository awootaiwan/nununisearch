import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tw from './lang/zh-TW.json';

const resources = {
  'zh-TW': {
    translation: tw,
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh-TW",
    fallbackLng: "zh-TW",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;