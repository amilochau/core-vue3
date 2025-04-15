import { registerAuth } from '@amilochau/core-vue3-auth';
import { coreOptionsBuilder, environmentOptionsBuilder } from './data/config';
import { handleHotUpdate, routes } from 'vue-router/auto-routes';
import { toValue } from 'vue';
import { registerPwa } from '@amilochau/core-vue3-pwa/utils';
import App from './App.vue';

import 'vuetify/styles';
import { createCoreVue3App } from '@amilochau/core-vue3';

export const coreVue3App = createCoreVue3App(App,
  {
    router: {
      routes,
    },
    application: {
      contactUrlBuilder: (lang) => `https://contact.milochau.com/${toValue(lang)}`,
      privacyUrlBuilder: (lang) => `https://milochau.com/${toValue(lang)}/privacy`,
    },
  },
  environmentOptionsBuilder,
  coreOptionsBuilder,
  (context) => {
    if (import.meta.hot) {
      handleHotUpdate(context.router);
    }

    registerAuth(context, {
      cognito: {
        userPoolIdBuilder: () => 'eu-west-3_Trx7Zxn8M',
        clientIdBuilder: () => 'utanndb0eu3s7gdtuj19rb45e',
      },
    });

    registerPwa(context.router);
  },
);
