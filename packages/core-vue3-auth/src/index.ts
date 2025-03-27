import type { CoreVue3Context } from '@amilochau/core-vue3/types';
import { registerCognito } from './plugins/cognito';
import type { CoreVue3AuthOptions } from './types/index';
import { registerRouterGuards } from './plugins/router';

/**
 * Register authentication.
 * @param context Registration context.
 * @param options Authentication options.
 */
export const registerAuth = (context: CoreVue3Context, options: CoreVue3AuthOptions) => {
  context.app.provide('options-auth', options);
  registerCognito(context.app, options);
  registerRouterGuards(context);
};
