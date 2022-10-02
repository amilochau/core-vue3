import { createApp } from 'vue'
import App from './App.vue'
import head from './plugins/head'
import i18n from './plugins/i18n'
import router from './plugins/router'
import pinia from './plugins/pinia'
import vuetify from './plugins/vuetify'
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

app.use(head);
app.use(i18n);
app.use(router);
app.use(pinia);
app.use(vuetify);
app.use(msal, msalInstance);

msalInstance.handleRedirectPromise();

router.isReady().then(() => {
  app.mount('#app');
})
