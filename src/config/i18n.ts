import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      dashboard: 'Dashboard',
    },
  },
  ar: {
    translation: {
      welcome: 'مرحبًا',
      dashboard: 'لوحة التحكم',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
})

export default i18n
