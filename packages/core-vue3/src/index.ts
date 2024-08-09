import { type App, createApp } from 'vue';
import type { Router } from 'vue-router';
import type { Pinia } from 'pinia';
import type { CoreOptions, EnvironmentOptions } from './types/options';

import { registerI18n } from './plugins/i18n';
import { registerHead } from './plugins/head';
import { registerVuetify } from './plugins/vuetify';
import { registerPinia } from './plugins/pinia';
import { registerRouter } from './plugins/router';
import { registerPwa } from './plugins/pwa';

import PageApp from './pages/PageApp.vue';

// Styles
import './styles/main.scss';

/**
 * Create a core-vue3 app instance.
 * @param environmentOptionsBuilder Environment options builder.
 * @param coreOptionsBuilder Core options builder.
 * @param fn Further registration steps to execute after context creation (standard plugins registration).
 */
export const createCoreVue3App = async (
  environmentOptionsBuilder: (context: { host: string, subdomain: string }) => EnvironmentOptions,
  coreOptionsBuilder: (environmentOptions: EnvironmentOptions) => CoreOptions,
  fn?: (context: { app: App, pinia: Pinia, router: Router, coreOptions: CoreOptions }) => Promise<any>,
) => {
  // Create vue.js app
  const app = createApp(PageApp);

  // Build environment
  const host = window.location.host;
  const subdomain = host.split('.')[0];
  const environmentOptions = environmentOptionsBuilder({ host, subdomain });
  environmentOptions.variables = {
    ...import.meta.env,
    ...environmentOptions.variables,
  };

  // Build core options
  const coreOptions = coreOptionsBuilder(environmentOptions);

  // Provide options
  app.provide('core-options', coreOptions);
  app.provide('environment-options', environmentOptions);

  const i18n = registerI18n(app, coreOptions);
  const head = registerHead(app, coreOptions);
  const vuetify = registerVuetify(app, coreOptions);
  const pinia = registerPinia(app, coreOptions);
  const router = registerRouter(app, pinia, coreOptions);

  await fn?.({ app, pinia, router, coreOptions });

  app.config.errorHandler = console.error;
  app.config.warnHandler = console.warn;
  router.onError(console.error);

  app.use(router);

  registerPwa(router);

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
