import type { CoreVue3AuthOptions } from '../types';
import { Amplify } from 'aws-amplify';
import type { App } from 'vue';

/**
 * Register Cognito.
 * @param app App instance.
 * @param options Options.
 */
export const registerCognito = (app: App, options: CoreVue3AuthOptions) => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: options.cognito.userPoolIdBuilder(),
        userPoolClientId: options.cognito.clientIdBuilder(),
      },
    },
  });
};
