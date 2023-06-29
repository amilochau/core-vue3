import { createApp } from 'vue'
import App from './App.vue'
import milochauCore from '@amilochau/core-vue3'
import milochauCoreAuth from '@amilochau/core-vue3-auth'
import { coreOptions } from './data/config'

import 'vuetify/styles'

const app = createApp(App);

app.use(milochauCoreAuth, coreOptions);
app.use(milochauCore, coreOptions);
