import { CoreVue3Auth } from '@amilochau/core-vue3-auth'
import { coreOptions } from './data/config'

import 'vuetify/styles'

export const createApp = await CoreVue3Auth(coreOptions)();
