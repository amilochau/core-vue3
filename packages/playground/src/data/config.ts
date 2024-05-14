import { type MilochauCoreOptions } from '@amilochau/core-vue3/types';
import { getConfig, getCurrentEnvironment } from '../utils/config';
import routes from './routes';
import { useMapsStore } from '../stores';
import { navigation } from './navigation';
import logoUrl from '@/assets/logo.png';
import PageRoot from '@/pages/PageRoot.vue';

export enum Environment {
  Default = 'default',
  LocalDevelopment = 'local_development',
  LocalProduction = 'local_production',
  Development = 'dev',
  Production = 'prd',
}

export type EnvConfigValues = {
  [key in Environment]: Record<string, string>
};

export const defaultEnv: Environment = Environment.Default;

export const envConfig: EnvConfigValues = {
  default: {
  },
  local_development: {
    VITE_API_URL: 'http://localhost:4000',
  },
  local_production: {
    VITE_API_URL: 'http://localhost:4000',
  },
  dev: {
    VITE_API_URL: 'http://localhost:4000',
  },
  prd: {
    VITE_API_URL: 'http://localhost:4000',
  },
};

export const getCurrentEnv = (host: string, subdomain: string): Environment => {
  if (host.includes('localhost')) {
    return Environment.LocalDevelopment;
  } else if (subdomain.includes('dev')) {
    return Environment.Development;
  } else {
    return Environment.Production;
  }
};

export const coreOptions: MilochauCoreOptions = {
  application: {
    name: 'Maps',
    contact: 'Antoine Milochau',
    logoUrl,
    navigation,
    isProduction: getCurrentEnvironment() === Environment.Production,
  },
  api: {
    gatewayUri: getConfig('VITE_API_URL'),
  },
  i18n: {
    messages: {
      en: {
        appTitle: 'core-vue3 playground',
      },
      fr: {
        appTitle: 'Example core-vue3',
      },
    },
  },
  routes: routes,
  rootComponent: PageRoot,
  clean: () => {
    const mapsStore = useMapsStore();

    return () => {
      mapsStore.clean();
    };
  },
};
