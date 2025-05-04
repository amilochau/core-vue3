import type { CoreOptions, EnvironmentOptions } from '@amilochau/core-vue3/types';
import { useMapsStore } from '../stores';

export const environmentOptionsBuilder: (context: { host: string, subdomain: string }) => EnvironmentOptions = ({ host, subdomain }) => {
  return {
    variables: {
      VITE_API_URL: 'http://localhost:4000',
    },
    isProduction: !host.includes('localhost') && !subdomain.includes('dev'),
  };
};

export const coreOptionsBuilder: (context: EnvironmentOptions) => CoreOptions = ({ variables }) => ({
  api: {
    apiBaseUriBuilder: () => variables['VITE_API_URL'],
  },
  clean: () => {
    const mapsStore = useMapsStore();

    return () => {
      mapsStore.clean();
    };
  },
});
