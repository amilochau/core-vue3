import type { App } from 'vue';
import type { Router } from 'vue-router';
import type { Pinia } from 'pinia';
import { createCoreVue3App } from '@amilochau/core-vue3';
import { type MilochauCoreOptions } from '@amilochau/core-vue3/types';

import cognito from './plugins/cognito';
import routes from './data/routes';
import { signOut } from 'aws-amplify/auth';

export const createCoreVue3AuthApp = (
  options: MilochauCoreOptions,
  fn?: (context: { app: App, pinia: Pinia, router: Router }) => Promise<any>,
) => {
  options.routes.push(...routes);
  if (options.identity) {
    options.identity.logout = signOut;
  }

  return createCoreVue3App(options, async (context) => {
    context.app.use(cognito, options);
    fn?.(context);
  });
};
