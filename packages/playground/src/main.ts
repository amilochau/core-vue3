import App from './App.vue'
import { CoreVue3 } from '@amilochau/core-vue3'
import { coreOptions } from './data/config'

import 'vuetify/styles'

export const createApp = CoreVue3(App, coreOptions);
