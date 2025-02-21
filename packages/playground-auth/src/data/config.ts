import type { CoreOptions, EnvironmentOptions, NotificationsRegisterRequest } from '@amilochau/core-vue3/types';
import { useMapsStore } from '../stores';
import { useNotificationsApi } from '@/composition/notifications.api';

export const environmentOptionsBuilder: (context: { host: string, subdomain: string }) => EnvironmentOptions = ({ host, subdomain }) => {
  if (host.includes('localhost')) {
    return {
      variables: {
        VITE_API_URL: 'http://localhost:4000',
      },
      isProduction: false,
    };
  } else if (subdomain.includes('dev')) {
    return {
      variables: {
        VITE_API_URL: 'http://localhost:4000',
      },
      isProduction: false,
    };
  } else {
    return {
      variables: {
        VITE_API_URL: 'http://localhost:4000',
      },
      isProduction: true,
    };
  }
};

export const coreOptionsBuilder: (context: EnvironmentOptions) => CoreOptions = ({ variables }) => ({
  application: {
    name: 'Test',
    contact: 'Antoine Milochau',
  },
  api: {
    apiBaseUriBuilder: () => variables['VITE_API_URL'],
  },
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
