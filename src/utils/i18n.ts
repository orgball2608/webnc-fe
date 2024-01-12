import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from '../locales/en.json'
import translationVI from '../locales/vi.json'

export const resources = {
  vi: {
    translation: translationVI
  },
  en: {
    translation: translationEN
  }
}

i18n.use(initReactI18next).init({
  resources,

  //language to use if translations in user language are not available
  fallbackLng: 'vi',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false // not needed for react!!
  },
  react: {
    bindI18n: 'languageChanged',
    bindI18nStore: '',
    transEmptyNodeValue: '',
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    useSuspense: true
  }
})

export default i18n
