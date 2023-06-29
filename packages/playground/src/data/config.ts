import type { MilochauCoreOptions } from "@amilochau/core-vue3"
import { getConfig, getCurrentEnvironment } from "../utils/config"
import routes from "./routes"
import { useMapsStore } from "../stores"
import navigationItems from "./navigation"
import { ref } from 'vue'

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
  },
  local: {
    VITE_API_URL: "https://d37652aw4wwcmu.cloudfront.net/api/dev/a",
  },
  dev: {
    VITE_API_URL: "https://api-dev.milochau.com/maps/v1",
  },
  prd: {
    VITE_API_URL: "https://api.milochau.com/maps/v1",
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
    navigation: {
      items: navigationItems,
    },
    header: {
      onTitleClick: (router) => router.push({ name: 'Home' }),
    },
    footer: {
      enabled: true,
      items: ref([{
        title: 'GitHub',
        link: 'https://github.com/amilochau/core-vue3',
      }])
    },
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
  routes: routes,
  clean: () => {
    const mapsStore = useMapsStore()

    return () => {
      mapsStore.clean();
    }
  },
}
