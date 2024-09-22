import { createCoreVue3App } from '@amilochau/core-vue3';
import { coreOptionsBuilder, environmentOptionsBuilder } from './data/config';

import 'vuetify/styles';
import './styles/main.scss';

export const coreVue3App = createCoreVue3App(environmentOptionsBuilder, coreOptionsBuilder);
