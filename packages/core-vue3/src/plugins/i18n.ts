import { App } from "vue";
import { createI18n } from "vue-i18n";

import { MilochauCoreOptions } from "../types/options";

const coreCreateI18nPlugin = {
  install(app: App, options: MilochauCoreOptions) {

    const i18n = createI18n({
      locale: 'en',
      fallbackLocale: 'en',
      messages: options.messages,
      legacy: false
    })

    app.use(i18n)
  
    return i18n
    
  }
}

export default coreCreateI18nPlugin
