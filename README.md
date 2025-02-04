<p align="center">
  <a href="https://github.com/amilochau/core-vue3/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/amilochau/core-vue3" alt="License">
  </a>
  <a href="https://github.com/amilochau/core-vue3/releases">
    <img src="https://img.shields.io/github/v/release/amilochau/core-vue3" alt="Release">
  </a>
  <a href="https://www.npmjs.com/package/@amilochau/core-vue3">
    <img src="https://img.shields.io/npm/v/@amilochau/core-vue3.svg" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/@amilochau/core-vue3">
    <img src="https://img.shields.io/npm/dt/@amilochau/core-vue3.svg" alt="Downloads">
  </a>
</p>
<h1 align="center">
  @amilochau/core-vue3
</h1>

`@amilochau/core-vue3` is an opinionated package used to create vue.js v3 applications.

## Main features

- Application layout, with header and footer bars, navigation drawer, snackbar for messages
- Privacy with cookies approbation via a dedicated layer, privacy page, data cleaning on logout
- API integration, with error codes handling
- Default pages for error codes
- Reactive SEO tags per page
- Internationalization, light/dark themes
- Forms validation helpers
- Identity integration with AWS Cognito, using `amilochau/core-vue3-auth`
- PWA native support, with update button

## Usage

`amilochau/core-vue3` is proposed as a vue plugin.

1. Install the npm packages

Run the following command to install the npm package:

```pwsh
npm install @amilochau/core-vue3 @amilochau/core-vue3-auth
```

Note that `amilochau/core-vue3-auth` is optional - you can skip it if you don't need authentication with AWS Cognito.

2. Configure the plugin

Define your `coreOptions` - use a dedicated file for better code separation:

```typescript
import type { CoreOptions } from '@amilochau/core-vue3':

export const environmentOptionsBuilder: (context: { host: string, subdomain: string }) => EnvironmentOptions = ({ host, subdomain }) => {
  return {
    variables: {
      VITE_API_URL: 'YOUR API BASE URI',
    },
    isProduction: !host.includes('localhost') && !subdomain.includes('dev'),
  };
};

export const coreOptionsBuilder: (context: EnvironmentOptions) => CoreOptions = ({ variables }) => ({
  application: {
    name: 'YOU APPLICATION NAME',
    contact: 'YOUR APPLICATION OWNER',
    navigation: {
      items: ref([
        // YOUR APPLICATION NAVIGATION LINKS
      ])
    },
  },
  api: {
    buildApiBaseUri: ({ relativeBaseUri }) => `${variables['VITE_API_URL']}${relativeBaseUri}`,
  },
  i18: {
    messages: {
      en: {}, // <== USE THIS SECTION TO ADD GLOBAL ENGLISH TRANSLATIONS
      fr: {}  // <== USE THIS SECTION TO ADD GLOBAL FRENCH TRANSLATIONS
    },
  },
  identity: {
    cognito: {
      userPoolId: 'YOUR COGNITO USER POOL ID',
      clientId: 'YOUR COGNITO CLIENT ID',
    }
  },
  routes: [], // <== USE THIS SECTION TO ADD ROUTES
  clean: () => () => {} // WHAT TO CALL TO CLEAN LOCAL DATA ON LOGOUT
});
```

3. Register the plugin

Register `amilochau/core-vue3` in your main file:

```typescript
import { createCoreVue3App } from '@amilochau/core-vue3';
import { coreOptionsBuilder, environmentOptionsBuilder } from './data/config';

import 'vuetify/styles';

export const coreVue3App = createCoreVue3App(environmentOptionsBuilder, coreOptionsBuilder);
```

If you want to use authentication, register `amilochau/core-vue3-auth` in your main file:

```typescript
import { createCoreVue3AuthApp } from '@amilochau/core-vue3-auth';
import { coreOptionsBuilder, environmentOptionsBuilder } from './data/config';

import 'vuetify/styles';

export const coreVue3App = createCoreVue3AuthApp(environmentOptionsBuilder, coreOptionsBuilder);
```

---

## Dependencies

The following plugins are installed by `@amilochau/core-vue3`:
- `pinia`
- `vue-i18n`
- `vue-router`
- `vuetify`
- `vite-plugin-pwa`

The following plugin is installed by `@amilochau/core-vue3-auth`:
- `aws-amplify`

See the full list of dependencies [here](/packages/core-vue3/package.json).

## Composition API

Here are the helpers you can use from your code.

| Helper | Description |
| ------ | ----------- |
| `useApiAnonymous` | Sends HTTP requests to the API gateway configured via `api.gatewayUri` ; manages HTTP errors |
| `useApi` | Sends authenticated HTTP requests to the API gateway configured via `api.gatewayUri` ; manages HTTP errors *(only if `amilochau/core-vue3-auth is configured`)* |
| `useClean` | Cleans data from storage, typically on logout, as configured via `clean` |
| `useCognito` | Interact with AWS Cognito *(only if `amilochau/core-vue3-auth is configured`)* |
| `useAppOptions` | Lets you get the environment and core options defined on plugin registration |
| `useHandle` | Handle asynchronous requests to manage errors, with loader bar and snackbar messages |
| `useNavigation` | Helps you use router with back navigation |
| `useNotifications` | Lets you register your application for push notifications |
| `usePage` | Define page metadata |
| `useValidationRules` | Lets you use pre-defined validation rules on plain data |

Here are the `pinia` stores you can use from your code.

| Store name | Helper | Description |
| ---------- | ------ | ----------- |
| `app` | `useAppStore` | Lets you display messages in a snackbar |
| `cookies` | `useCookiesStore` | Lets you known if the current user has accepted cookies |
| `identity` | `useIdentityStore` | Lets you display data from the current user |
| `language` | `useLanguageStore` | Lets you know the current language configured for the UI |
| `notifications` | `useNotificationsStore` | Lets you get data on notifications registration |
| `theme` | `useThemeStore` | Lets you know the current theme configured for the UI |
| `pwa` | `usePwaStore` | Lets you manage the PWA application updates |

## Options

Application options must be configured on the application initialization - using the `createCoreVue3App` or the `createCoreVue3AuthApp` method, and can then be injected via the `useAppOptions` composition API.

Here are the proposed options.

| Property | Usage | Type | Description |
| -------- | ----- | ---- | ----------- |
| `coreOptions` | `const { coreOptions } = useAppOptions();` | `CoreOptions` | Core options, containing settings provided on application initialization. |
| `environmentOptions` | `const { environmentOptions } = useAppOptions();` | `EnvironmentOptions` | Environment options, containing environment variables. |
| `apiEnabled ` | `const { apiEnabled } = useAppOptions();` | `boolean` | Whether API capabilities are properly configured, and can be used in the application. |
| `authenticationEnabled` | `const { authenticationEnabled } = useAppOptions();` | `boolean` | Whether identity capabilities are properly configured, and can be used in the application. |

See the full definition of options [here](/packages/core-vue3/src/types/options.ts).

You can find a sample of these configuration options in the [sample app options](/packages/playground/src/data/config.ts).

## Notes

- You have to define a route named `Home`, so that default redirections can work.

--- 

## Contribute

Feel free to push your code if you agree with publishing under the [MIT license](./LICENSE).
