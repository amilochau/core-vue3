import { createCoreVue3AuthApp } from '@amilochau/core-vue3-auth';
import { coreOptionsBuilder, environmentOptionsBuilder } from './data/config';

import 'vuetify/styles';

export const coreVue3App = createCoreVue3AuthApp(environmentOptionsBuilder, coreOptionsBuilder);
