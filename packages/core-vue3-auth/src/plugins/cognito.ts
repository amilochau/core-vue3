import { type CoreOptions } from '@amilochau/core-vue3/types';
import { Amplify } from 'aws-amplify';
import type { App } from 'vue';

export default {
  install: (app: App, coreOptions: CoreOptions) => {
    if (coreOptions.identity) {
      Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId: coreOptions.identity.cognito.userPoolId,
            userPoolClientId: coreOptions.identity.cognito.clientId,
          },
        },
      });
    }
  },
};
