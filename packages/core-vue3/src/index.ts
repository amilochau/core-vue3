import { type Component, createApp as createClientApp } from 'vue';
import type { CoreOptions, CoreVue3Context, CoreVue3Options, EnvironmentOptions } from './types/options';

import { registerI18n } from './plugins/i18n';
import { registerHead } from './plugins/head';
import { registerVuetify } from './plugins/vuetify';
import { registerPinia } from './plugins/pinia';
import { registerRouter } from './plugins/router';

// Styles
import './styles/main.scss';

const documentReady = (_passThrough?: any) => {
  if (document.readyState === 'loading') {
    return new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', () => resolve(_passThrough));
    });
  }

  return Promise.resolve(_passThrough);
};

/**
 * Create a core-vue3 app instance.
 * @param App App component.
 * @param options Options.
 * @param environmentOptionsBuilder Environment options builder.
 * @param coreOptionsBuilder Core options builder.
 * @param fn Further registration steps to execute after context creation (standard plugins registration).
 */
export const createCoreVue3App = (
  App: Component,
  options: CoreVue3Options,
  environmentOptionsBuilder: (context: { host: string, subdomain: string }) => EnvironmentOptions,
  coreOptionsBuilder: (environmentOptions: EnvironmentOptions) => CoreOptions,
  fn?: (context: CoreVue3Context) => Promise<void> | void,
) => {

  const createApp = async () => {

    // Create vue.js app
    const app = createClientApp(App);

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

    app.provide('options-app', options.application);

    const router = registerRouter(app, options);
    const i18n = registerI18n(app, options);
    const head = registerHead(app);
    const vuetify = registerVuetify(app, options);
    const pinia = registerPinia(app);

    const context: CoreVue3Context = {
      app,
      router,
      routes: options.router.routes,
      head,
      i18n,
      vuetify,
      pinia,
    };

    await documentReady();
    await fn?.(context);

    app.config.errorHandler = console.error;
    app.config.warnHandler = console.warn;
    router.onError(console.error);

    app.use(router);

    return context;
  };

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  (async () => {
    const { app, router } = await createApp();
    await router.isReady();
    app.mount('#app');
  })();

  return createApp;
};
