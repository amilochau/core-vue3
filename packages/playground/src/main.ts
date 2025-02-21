import { createCoreVue3App } from '@amilochau/core-vue3';
import { coreOptionsBuilder, environmentOptionsBuilder } from './data/config';
import { handleHotUpdate, routes } from 'vue-router/auto-routes';
import { toValue } from 'vue';
import App from './App.vue';

import 'vuetify/styles';
import './styles/main.scss';

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
  },
);
