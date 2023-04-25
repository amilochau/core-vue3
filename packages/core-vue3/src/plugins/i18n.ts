import type { App } from "vue";
import { createI18n } from "vue-i18n";
import merge from 'deepmerge'
import type { MilochauCoreOptions } from "../types/options";

export default {
  install: (app: App, options: MilochauCoreOptions) => {

    const i18n = createI18n(
      merge({
        locale: 'en',
        fallbackLocale: 'en',
        legacy: false,
      }, options.i18n || {}))

    app.use(i18n)

    return i18n
  }
}
