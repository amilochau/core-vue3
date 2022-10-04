import { Configuration, LogLevel, PublicClientApplication } from "@azure/msal-browser";
import { getConfig } from "../../utils/config";

export const authorities = {
  register_login: 'https://milochau.b2clogin.com/tfp/milochau.onmicrosoft.com/B2C_1_register_login',
  profile_editing: 'https://milochau.b2clogin.com/tfp/milochau.onmicrosoft.com/B2C_1_profile_editing'
}

export const scopes = {
  use: getConfig('VITE_API_SCOPE_USE'),
}

export const msalConfig: Configuration = {
  auth: {
    clientId: getConfig('VITE_API_CLIENT_ID'),
    authority: authorities.register_login,
    knownAuthorities: ['milochau.b2clogin.com'],
    redirectUri: getConfig('VITE_REDIRECT_URI'),
    postLogoutRedirectUri: getConfig('VITE_REDIRECT_URI')
  },
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

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: [
    scopes.use
  ],
};
