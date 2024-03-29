import { type App, createApp } from 'vue';
import type { Router } from 'vue-router';
import type { Pinia } from 'pinia';
import type { MilochauCoreOptions } from './types/options';

import { registerI18n } from './plugins/i18n';
import { registerHead } from './plugins/head';
import { registerVuetify } from './plugins/vuetify';
import { registerPinia } from './plugins/pinia';
import { registerRouter } from './plugins/router';
import { registerPwa } from './plugins/pwa';

import PageApp from './pages/PageApp.vue';

// Styles
import './styles/main.scss';

export const createCoreVue3App = async (
  options: MilochauCoreOptions,
  fn?: (context: { app: App, pinia: Pinia, router: Router }) => Promise<any>,
) => {
  const app = createApp(PageApp);

  app.provide('core-options', options);

  const i18n = registerI18n(app, options);
  const head = registerHead(app, options);
  const vuetify = registerVuetify(app, options);
  const pinia = registerPinia(app, options);
  const router = registerRouter(app, pinia, options);

  await fn?.({ app, pinia, router });

  app.config.errorHandler = console.error;
  app.config.warnHandler = console.warn;
  router.onError(console.error);

  app.use(router);

  registerPwa({ router });

  // wait until page component is fetched before mounting
  await router.isReady();

  app.mount('#app', true);

  return {
    app,
    head,
    router,
    i18n,
    pinia,
    vuetify,
  };
};
