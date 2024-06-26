import { type MilochauCoreOptions, type NotificationsRegisterRequest } from '@amilochau/core-vue3/types';
import { getConfig, getCurrentEnvironment } from '../utils/config';
import routes from './routes';
import { useMapsStore } from '../stores';
import { navigation } from './navigation';
import { useNotificationsApi } from '@/composition/notifications.api';

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
    VITE_COGNITO_USERPOOL_ID: '',
    VITE_COGNITO_CLIENT_ID: '',
  },
  local_development: {
    VITE_API_URL: 'http://localhost:4000',
    VITE_COGNITO_USERPOOL_ID: 'eu-west-3_Trx7Zxn8M',
    VITE_COGNITO_CLIENT_ID: 'utanndb0eu3s7gdtuj19rb45e',
  },
  local_production: {
    VITE_API_URL: 'http://localhost:4000',
    VITE_COGNITO_USERPOOL_ID: 'eu-west-3_UBYZWnUAL',
    VITE_COGNITO_CLIENT_ID: '3630qvq2muq2fkl2e8lsj5800o',
  },
  dev: {
    VITE_API_URL: 'http://localhost:4000',
    VITE_COGNITO_USERPOOL_ID: '',
    VITE_COGNITO_CLIENT_ID: '',
  },
  prd: {
    VITE_API_URL: 'http://localhost:4000',
    VITE_COGNITO_USERPOOL_ID: '',
    VITE_COGNITO_CLIENT_ID: '',
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
  identity: {
    cognito: {
      userPoolId: getConfig('VITE_COGNITO_USERPOOL_ID'),
      clientId: getConfig('VITE_COGNITO_CLIENT_ID'),
    },
  },
  routes: routes,
  clean: () => {
    const mapsStore = useMapsStore();

    return () => {
      mapsStore.clean();
    };
  },
  notifications: {
    pushKey: 'BDKw7_ihg5mQvriWE7o7Stl2NWSfbCW9v2P-EbCJ48qcaLw05Fy2yaENB6LGRS6C2TE59ztoMOXxlEYQua308EE',
    register: () => {
      const notificationsApi = useNotificationsApi();

      return async (request: NotificationsRegisterRequest) => {
        await notificationsApi.register(request);
      };
    },
  },
};
