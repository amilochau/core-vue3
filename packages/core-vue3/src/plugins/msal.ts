import { App, reactive } from 'vue'
import { EventMessage, EventMessageUtils, EventType, InteractionStatus, PublicClientApplication, AccountInfo, Configuration, LogLevel, AuthenticationResult } from "@azure/msal-browser";
import { MilochauCoreOptions } from '../types/options'

type AccountIdentifiers = Partial<Pick<AccountInfo, "homeAccountId" | "localAccountId" | "username">>;

function accountArraysAreEqual(arrayA: Array<AccountIdentifiers>, arrayB: Array<AccountIdentifiers>): boolean {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  const comparisonArray = [...arrayB];

  return arrayA.every((elementA) => {
    const elementB = comparisonArray.shift();
    if (!elementA || !elementB) {
      return false;
    }

    return (elementA.homeAccountId === elementB.homeAccountId) &&
      (elementA.localAccountId === elementB.localAccountId) &&
      (elementA.username === elementB.username);
  });
}

const coreMsalPlugin = {

  createInstance: (options: MilochauCoreOptions) => {

    const msalConfig: Configuration = {
      auth: options.identity.auth,
      cache: {
        cacheLocation: 'localStorage'
      },
      system: {
        loggerOptions: {
          loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
            if (containsPii) {
              return;
            }
            switch (level) {
              case LogLevel.Error:
                console.error(message);
                return;
              case LogLevel.Info:
                console.info(message);
                return;
              case LogLevel.Verbose:
                console.debug(message);
                return;
              case LogLevel.Warning:
                console.warn(message);
                return;
              default:
                return;
            }
          },
          logLevel: LogLevel.Warning
        }
      }
    }
    
    console.log('core - msal - before new msalInstance')

    var msalInstance = new PublicClientApplication(msalConfig)

    console.log('core - index - after new msalInstance')

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
    
    return msalInstance
  },

  install: (app: App, msalInstance: PublicClientApplication, options: MilochauCoreOptions) => {

    const inProgress = InteractionStatus.Startup;
    const accounts = msalInstance.getAllAccounts();

    const state = reactive({
      instance: msalInstance,
      inProgress: inProgress,
      accounts: accounts
    });

    app.config.globalProperties.$msal = state;

    msalInstance.addEventCallback((message: EventMessage) => {
      switch (message.eventType) {
        case EventType.ACCOUNT_ADDED:
        case EventType.ACCOUNT_REMOVED:
        case EventType.LOGIN_SUCCESS:
        case EventType.SSO_SILENT_SUCCESS:
        case EventType.HANDLE_REDIRECT_END:
        case EventType.LOGIN_FAILURE:
        case EventType.SSO_SILENT_FAILURE:
        case EventType.LOGOUT_END:
        case EventType.ACQUIRE_TOKEN_SUCCESS:
        case EventType.ACQUIRE_TOKEN_FAILURE:
          const currentAccounts = msalInstance.getAllAccounts();
          if (!accountArraysAreEqual(currentAccounts, state.accounts)) {
            state.accounts = currentAccounts;
          }
          break;
      }

      const status = EventMessageUtils.getInteractionStatusFromEvent(message, state.inProgress);
      if (status !== null) {
        state.inProgress = status;
      }
    });

  }
}

export default coreMsalPlugin
