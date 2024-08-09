import type { App } from 'vue';
import type { Router } from 'vue-router';
import type { Pinia } from 'pinia';
import { createCoreVue3App } from '@amilochau/core-vue3';
import type { CoreOptions, EnvironmentOptions } from '@amilochau/core-vue3/types';

import cognito from './plugins/cognito';
import routes from './data/routes';

/**
 * Create a core-vue3 app instance, with authentication plugin.
 * @param environmentOptionsBuilder Environment options builder.
 * @param coreOptionsBuilder Core options builder.
 * @param fn Further registration steps to execute after context creation (standard plugins registration).
 */
export const createCoreVue3AuthApp = (
  environmentOptionsBuilder: (context: { host: string, subdomain: string }) => EnvironmentOptions,
  coreOptionsBuilder: (environmentOptions: EnvironmentOptions) => CoreOptions,
  fn?: (context: { app: App, pinia: Pinia, router: Router, coreOptions: CoreOptions }) => Promise<any>,
) => {

  const augmentedCoreOptionsBuilder = (environmentOptions: EnvironmentOptions): CoreOptions => {
    const coreOptions = coreOptionsBuilder(environmentOptions);
    coreOptions.routes.push(...routes);
    return coreOptions;
  };

  return createCoreVue3App(environmentOptionsBuilder, augmentedCoreOptionsBuilder, async (context) => {
    context.app.use(cognito, context.coreOptions);
    fn?.(context);
  });
};
