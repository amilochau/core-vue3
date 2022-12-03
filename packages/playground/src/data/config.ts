import { MilochauCoreOptions } from "@amilochau/core-vue3"
import { getConfig } from "../utils/config"
import routes from "./routes"
import { useMapsStore } from "../stores"
import navigation from "./navigation"

export enum Environment {
  Default = 'default',
  Local = 'local',
  Development = 'dev',
  Production = 'prd'
}

export type EnvConfigValues = {
  [key in Environment]: Record<string, string>
}

export const defaultEnv: Environment = Environment.Default

export const envConfig: EnvConfigValues = {
  default: {
    VITE_GOOGLE_MAPS_API_KEY: "AIzaSyA11QlCEpdVbQTSOcMzgtI97kSFHrdNqRg",
    VITE_API_AUTHORITY: "milochau.b2clogin.com",
    VITE_API_AUTHORITY_LOGIN: "https://milochau.b2clogin.com/tfp/milochau.onmicrosoft.com/B2C_1A_SIGNUP_SIGNIN",
    VITE_API_AUTHORITY_PROFILE: "https://milochau.b2clogin.com/tfp/milochau.onmicrosoft.com/B2C_1A_PROFILEEDIT",
    VITE_API_AUTHORITY_PASSWORDRESET: "https://milochau.b2clogin.com/tfp/milochau.onmicrosoft.com/B2C_1A_PROFILEEDITPASSWORDCHANGE"
  },
  local: {
    VITE_API_URL: "https://api-dev.milochau.com/maps/v1",
    VITE_API_CLIENT_ID: "5ea3d7ac-f358-4a7b-9702-6b4672faf89a",
    VITE_REDIRECT_URI: "http://localhost:3000",
    VITE_API_SCOPE_USE: "https://milochau.onmicrosoft.com/maps-api-development/Use"
  },
  dev: {
    VITE_API_URL: "https://api-dev.milochau.com/maps/v1",
    VITE_API_CLIENT_ID: "5ea3d7ac-f358-4a7b-9702-6b4672faf89a",
    VITE_REDIRECT_URI: "https://maps-dev.milochau.com",
    VITE_API_SCOPE_USE: "https://milochau.onmicrosoft.com/maps-api-development/Use"
  },
  prd: {
    VITE_API_URL: "https://api.milochau.com/maps/v1",
    VITE_API_CLIENT_ID: "2aa180f1-f100-4f05-b378-ff01f2610a9e",
    VITE_REDIRECT_URI: "https://maps.milochau.com",
    VITE_API_SCOPE_USE: "https://milochau.onmicrosoft.com/maps-api-production/Use"
  }
}

export const getCurrentEnv = (host: string, subdomain: string): Environment => {
  if (host.includes('localhost')) {
    return Environment.Local
  } else if (subdomain.includes('dev')) {
    return Environment.Development
  } else {
    return Environment.Production
  }
}

export const authorities = {
  register_login: getConfig('VITE_API_AUTHORITY_LOGIN'),
  profile_editing: getConfig('VITE_API_AUTHORITY_PROFILE'),
  password_reset: getConfig('VITE_API_AUTHORITY_PASSWORDRESET'),
}

export const scopes = {
  use: getConfig('VITE_API_SCOPE_USE'),
}

export const coreOptions: MilochauCoreOptions = {
  application: {
    name: 'Maps',
    contact: 'Antoine Milochau',
    navigation,
    onAppBarTitleClick: (router) => router.push({ name: 'Home' })
  },
  api: {
    gatewayUri: getConfig('VITE_API_URL')
  },
  i18n: {
    messages: {
      en: {
        appTitle: 'core-vue3 playground'
      },
      fr: {
        appTitle: 'Example core-vue3'
      }
    },
    //fallbackWarn: false
  },
  identity: {
    authorities: authorities,
    scopes: {
      use: getConfig('VITE_API_SCOPE_USE'),
    },
    auth: {
      clientId: getConfig('VITE_API_CLIENT_ID'),
      authority: authorities.register_login,
      knownAuthorities: [getConfig('VITE_API_AUTHORITY')],
      redirectUri: getConfig('VITE_REDIRECT_URI'),
      postLogoutRedirectUri: getConfig('VITE_REDIRECT_URI')
    },
    loginRequest: {
      scopes: [
        scopes.use
      ],
    }
  },
  routes: routes,
  clean: () => {
    const mapsStore = useMapsStore()

    return () => {
      mapsStore.clean();
    }
  }
}
