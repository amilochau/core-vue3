import { createApp } from 'vue'
import App from './App.vue'
import milochauCore from './plugins/milochau-core'
import router from './plugins/router'
import pinia from './plugins/pinia'
import msal from './plugins/msal'
import { loadFonts } from './plugins/webfontloader'
import { msalInstance } from './plugins/msal/config'
import { CustomNavigationClient } from './plugins/router/navigation-client'
import { AuthenticationResult, EventType } from '@azure/msal-browser'

// Styles
import './styles/main.scss'
loadFonts()

const navigationClient = new CustomNavigationClient(router);
msalInstance.setNavigationClient(navigationClient);

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  }
});

const app = createApp(App);

app.use(milochauCore);

app.use(router);
app.use(pinia);
app.use(msal, msalInstance);

msalInstance.handleRedirectPromise();

router.isReady().then(() => {
  app.mount('#app');
})
