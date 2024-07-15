import type { App } from 'vue';
import type { Router } from 'vue-router';
import type { Pinia } from 'pinia';
import { createCoreVue3App } from '@amilochau/core-vue3';
import { type MilochauCoreOptions } from '@amilochau/core-vue3/types';

import cognito from './plugins/cognito';
import routes from './data/routes';

/**
 * Create a core-vue3 app instance, with authentication plugin.
 * @param options Registration options.
 * @param fn Further registration steps to execute after context creation (standard plugins registration).
 */
export const createCoreVue3AuthApp = (
  options: MilochauCoreOptions,
  fn?: (context: { app: App, pinia: Pinia, router: Router }) => Promise<any>,
) => {
  options.routes.push(...routes);

  return createCoreVue3App(options, async (context) => {
    context.app.use(cognito, options);
    fn?.(context);
  });
};
