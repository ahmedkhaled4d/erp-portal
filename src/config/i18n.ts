import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// Translations
import arTranslations from '../i18n/ar.json'
import enTranslations from '../i18n/en.json'

const resources = {
  en: { translation: enTranslations },
  ar: { translation: arTranslations },
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
