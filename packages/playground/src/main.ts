console.log('playground - START')

import { createApp } from 'vue'
import App from './App.vue'
import milochauCore from './plugins/milochau-core'
import router from './plugins/router'
import { loadFonts } from './plugins/webfontloader'
import { CustomNavigationClient } from './plugins/router/navigation-client'
import { msalInstance } from '@amilochau/core-vue3'

// Styles
import './styles/main.scss'
loadFonts()


console.log('playground - main - A')

const navigationClient = new CustomNavigationClient(router);
msalInstance.setNavigationClient(navigationClient);

console.log('playground - main - B - before create App')

const app = createApp(App);

console.log('playground - main - C - after create App')

app.use(milochauCore);

console.log('playground - main - D - after use milochau core')

app.use(router);

console.log('playground - main - E - after all use')

msalInstance.handleRedirectPromise();

router.isReady().then(() => {
  console.log('playground - main - G - before mount app')

  app.mount('#app');

  console.log('playground - main - H - after mount app')
})

console.log('playground - main - F - end of file')
