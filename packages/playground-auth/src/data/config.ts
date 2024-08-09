import type { CoreOptions, EnvironmentOptions, NotificationsRegisterRequest } from '@amilochau/core-vue3/types';
import routes from './routes';
import { useMapsStore } from '../stores';
import { navigation } from './navigation';
import { useNotificationsApi } from '@/composition/notifications.api';

export const environmentOptionsBuilder: (context: { host: string, subdomain: string }) => EnvironmentOptions = ({ host, subdomain }) => {
  if (host.includes('localhost')) {
    return {
      variables: {
        VITE_API_URL: 'http://localhost:4000',
        VITE_COGNITO_USERPOOL_ID: 'eu-west-3_Trx7Zxn8M',
        VITE_COGNITO_CLIENT_ID: 'utanndb0eu3s7gdtuj19rb45e',
      },
      isProduction: false,
    };
  } else if (subdomain.includes('dev')) {
    return {
      variables: {
        VITE_API_URL: 'http://localhost:4000',
        VITE_COGNITO_USERPOOL_ID: '',
        VITE_COGNITO_CLIENT_ID: '',
      },
      isProduction: false,
    };
  } else {
    return {
      variables: {
        VITE_API_URL: 'http://localhost:4000',
        VITE_COGNITO_USERPOOL_ID: '',
        VITE_COGNITO_CLIENT_ID: '',
      },
      isProduction: true,
    };
  }
};

export const coreOptionsBuilder: (context: EnvironmentOptions) => CoreOptions = ({ variables }) => ({
  application: {
    name: 'Test',
    contact: 'Antoine Milochau',
    navigation,
  },
  api: {
    apiBaseUriBuilder: () => variables['VITE_API_URL'],
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
      userPoolId: variables['VITE_COGNITO_USERPOOL_ID'],
      clientId: variables['VITE_COGNITO_CLIENT_ID'],
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
});
