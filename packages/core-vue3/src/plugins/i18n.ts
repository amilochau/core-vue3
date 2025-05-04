import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import type { CoreVue3Options } from '../types/options';

/**
 * Register vue-i18n.
 * @param app App instance.
 * @param options Options.
 */
export const registerI18n = (app: App, options: CoreVue3Options) => {
  const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    legacy: false,
    ...options.i18n,
  });
  app.use(i18n);

  return i18n;
};
