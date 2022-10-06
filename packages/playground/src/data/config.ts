import { MilochauCoreOptions } from "@amilochau/core-vue3"
import { getConfig } from "../utils/config"

import en from '../data/lang/en.json'
import fr from '../data/lang/fr.json'
import { useMapsStore } from "../stores"
import { getCurrentInstance } from "vue"

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
    VITE_API_AUTHORITY_LOGIN: "https://milochau.b2clogin.com/tfp/milochau.onmicrosoft.com/B2C_1_register_login",
    VITE_API_AUTHORITY_PROFILE: "https://milochau.b2clogin.com/tfp/milochau.onmicrosoft.com/B2C_1_profile_editing"
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
}

export const scopes = {
  use: getConfig('VITE_API_SCOPE_USE'),
}

export const loginRequest = {
  scopes: [
    scopes.use
  ],
}

export const coreOptions: MilochauCoreOptions = {
  application: {
    name: 'Maps',
    contact: 'Antoine Milochau',
    clean: () => {
      console.log('||||| config - clean |||||')
      const mapsStore = useMapsStore()

      mapsStore.clean()
    }
  },
  messages: {
    en,
    fr
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
    }
  }
}
