import { createCoreVue3App } from '@amilochau/core-vue3'
import { coreOptions } from './data/config'

import 'vuetify/styles'

export const coreVue3App = await createCoreVue3App(coreOptions);
