import { createApp } from 'vue'
import App from './App.vue'
import milochauCore from './plugins/milochau-core'
import router from './plugins/router'
import { CustomNavigationClient } from './plugins/router/navigation-client'
import { msalInstance } from '@amilochau/core-vue3'

// Styles
import './styles/main.scss'

const navigationClient = new CustomNavigationClient(router);
msalInstance.setNavigationClient(navigationClient);

const app = createApp(App);
app.use(milochauCore);
app.use(router);

msalInstance.handleRedirectPromise();

router.isReady().then(() => {
  app.mount('#app');
})
