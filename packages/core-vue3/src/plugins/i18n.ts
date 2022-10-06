import { App } from "vue";
import { createI18n } from "vue-i18n";
import merge from 'deepmerge'

import { MilochauCoreOptions } from "../types/options";
import en from '../data/en.json'
import fr from '../data/fr.json'

export default {
  install: (app: App, options: MilochauCoreOptions) => {

    const i18n = createI18n({
      locale: 'en',
      fallbackLocale: 'en',
      messages: merge(options.messages,
        {
          en,
          fr
        }),
      legacy: false
    })

    app.use(i18n)

    return i18n

  }
}
