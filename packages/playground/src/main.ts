import { createApp } from 'vue'
import App from './App.vue'
import milochauCore from '@amilochau/core-vue3'
import { coreOptions } from './data/config'

import 'vuetify/styles'

const app = createApp(App);

app.use(milochauCore, coreOptions);
