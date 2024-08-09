import type { CoreOptions, EnvironmentOptions } from '@amilochau/core-vue3/types';
import routes from './routes';
import { useMapsStore } from '../stores';
import { navigation } from './navigation';
import logoUrl from '@/assets/logo.png';
import PageRoot from '@/pages/PageRoot.vue';

export const environmentOptionsBuilder: (context: { host: string, subdomain: string }) => EnvironmentOptions = ({ host, subdomain }) => {
  return {
    variables: {
      VITE_API_URL: 'http://localhost:4000',
    },
    isProduction: !host.includes('localhost') && !subdomain.includes('dev'),
  };
};

export const coreOptionsBuilder: (context: EnvironmentOptions) => CoreOptions = ({ variables }) => ({
  application: {
    name: 'Test',
    contact: 'Antoine Milochau',
    logoUrl,
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
  routes: routes,
  rootComponent: PageRoot,
  clean: () => {
    const mapsStore = useMapsStore();

    return () => {
      mapsStore.clean();
    };
  },
});
