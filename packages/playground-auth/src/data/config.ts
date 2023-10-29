import { type MilochauCoreOptions, type NotificationsRegisterRequest } from "@amilochau/core-vue3/types"
import { getConfig, getCurrentEnvironment } from "../utils/config"
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
    VITE_COGNITO_USERPOOL_ID: "",
    VITE_COGNITO_CLIENT_ID: '',
  },
  local: {
    VITE_API_URL: "https://d37652aw4wwcmu.cloudfront.net/api/dev/a",
    VITE_COGNITO_USERPOOL_ID: "eu-west-3_91PfBkcmP",
    VITE_COGNITO_CLIENT_ID: '1oed2va2em6r9lkfvqbd3tspiu',
  },
  dev: {
    VITE_API_URL: "https://api-dev.milochau.com/maps/v1",
    VITE_COGNITO_USERPOOL_ID: "",
    VITE_COGNITO_CLIENT_ID: '',
  },
  prd: {
    VITE_API_URL: "https://api.milochau.com/maps/v1",
    VITE_COGNITO_USERPOOL_ID: "",
    VITE_COGNITO_CLIENT_ID: '',
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

export const coreOptions: MilochauCoreOptions = {
  application: {
    name: 'Maps',
    contact: 'Antoine Milochau',
    navigation,
    isProduction: getCurrentEnvironment() === Environment.Production,
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
  },
  identity: {
    cognito: {
      userPoolId: getConfig('VITE_COGNITO_USERPOOL_ID'),
      clientId: getConfig('VITE_COGNITO_CLIENT_ID'),
    },
  },
  routes: routes,
  clean: () => {
    const mapsStore = useMapsStore()

    return () => {
      mapsStore.clean();
    }
  },
  notifications: {
    pushKey: 'BDKw7_ihg5mQvriWE7o7Stl2NWSfbCW9v2P-EbCJ48qcaLw05Fy2yaENB6LGRS6C2TE59ztoMOXxlEYQua308EE',
    register: () => (request: NotificationsRegisterRequest) => {
      throw 'Not supported';
    }
  }
}
