import { createI18n } from "vue-i18n";
import en from '../data/lang/en.json'
import fr from '../data/lang/fr.json'

const messages = {
  en,
  fr,
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  legacy: false
})

export default i18n
