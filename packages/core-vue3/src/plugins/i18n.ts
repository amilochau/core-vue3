import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import type { CoreOptions } from '../types/options';

/**
 * Register vue-i18n.
 * @param app App instance.
 * @param coreOptions Core options.
 */
export const registerI18n = (app: App, coreOptions: CoreOptions) => {
  const i18n = createI18n(
    Object.assign({
      locale: 'en',
      fallbackLocale: 'en',
      legacy: false,
    }, coreOptions.i18n));

  app.use(i18n);

  return i18n;
};
