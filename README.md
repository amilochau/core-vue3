# @amilochau/core-vue3

vue.js v3 layout for AWS clients

## Introduction

`@amilochau/core-vue3` is a opinionated package used to create vue.js v3 applications.

## Features

- Application layout, with header and footer bars, navigation drawer, snackbar for messages
- Privacy with cookies approbation via a dedicated layer, privacy page, data cleaning on logout
- API integration, with error codes handling
- Default pages for error codes
- Reactive SEO tags per page
- Internationalization, light/dark themes
- Forms validation helpers
- Identity integration with AWS Cognito, using `amilochau/core-vue3-auth`

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
import type { MilochauCoreOptions } from "@amilochau/core-vue3"

export const coreOptions: MilochauCoreOptions = {
  application: {
    name: 'YOU APPLICATION NAME',
    contact: 'YOUR APPLICATION OWNER',
    navigation: {
      items: ref([
        // YOUR APPLICATION NAVIGATION LINKS
      ])
    },
    header: {
      onTitleClick: router => router.push({ name: 'YOUR HOME PAGE NAME' })
    },
    footer: {
      enabled: true,
      items: ref([
        // YOUR APPLICATION FOOTER LINKS
      ])
    },
    isProduction: true,
  },
  api: {
    gatewayUri: 'YOUR API BASE URI'
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
}
```

3. Register the plugin

Register `amilochau/core-vue3` in your main file:

```typescript
import App from './App.vue'
import { CoreVue3 } from '@amilochau/core-vue3'
import { coreOptions } from './data/config'

import 'vuetify/styles'

export const createApp = CoreVue3(App, coreOptions);
```

If you want to use authentication, register `amilochau/core-vue3-auth` in your main file:

```typescript
import App from './App.vue'
import { CoreVue3Auth } from '@amilochau/core-vue3-auth'
import { coreOptions } from './data/config'

import 'vuetify/styles'

export const createApp = CoreVue3Auth(App, coreOptions);
```

---

## Dependencies

The following plugins are installed by `@amilochau/core-vue3`:
- `pinia`
- `vue-i18n`
- `vue-router`
- `vuetify`
- 
The following plugin is installed by `@amilochau/core-vue3-auth`:
- `@aws-amplify/auth`

See the full list of dependencies [here](/packages/core-vue3/package.json).

## Composition API

Here are the helpers you can use from your code.

| Helper | Description |
| ------ | ----------- |
| `useApiAnonymous` | Sends HTTP requests to the API gateway configured via `api.gatewayUri` ; manages HTTP errors |
| `useApi` | Sends authenticated HTTP requests to the API gateway configured via `api.gatewayUri` ; manages HTTP errors *(only if `amilochau/core-vue3-auth is configured`)* |
| `useClean` | Cleans data from storage, typically on logout, as configured via `clean` |
| `useCognito` | Interact with AWS Cognito *(only if `amilochau/core-vue3-auth is configured`)* |
| `useCoreOptions` | Lets you get the core options defined on plugin registration |
| `useHandle` | Handle asynchronous requests to manage errors, with loader bar and snackbar messages |
| `usePage` | Define page metadata |
| `useValidationRules` | Lets you use pre-defined validation rules on plain data |

Here are the `pinia` stores you can use from your code.

| Store name | Helper | Description |
| ---------- | ------ | ----------- |
| `app` | `useAppStore` | Lets you display messages in a snackbar |
| `cookies` | `useCookiesStore` | Lets you known if the current user has accepted cookies |
| `identity` | `useIdentityStore` | Lets you display data from the current user |
| `language` | `useLanguageStore` | Lets you know the current language configured for the UI |
| `theme` | `useThemeStore` | Lets you know the current theme configured for the UI |

## Options

Here are the options you should provide in the `MilochauCoreOptions` class.

| Configuration path | Description |
| ------------------ | ----------- |
| `application.name` | Name of the application |
| `application.contact` | Application owner, as used in the policy page |
| `application.logoUrl` | URL of the application logo |
| `application.navigation.items` | Navigation links, as `vuetify` list items, used in the navigation drawer |
| `application.header.disabled` | Whether the header bar should be disabled (not displayed) |
| `application.header.onTitleClick` | Action to run when the user clicks on the title from the header bar |
| `application.footer.enabled` | Whether the footer bar should be enabled (displayed) |
| `application.footer.items` | Additional items to display into the footer bar |
| `application.isProduction` | Whether the current application is production |
| `api.gatewayUri` | Base URI used by the `useApi` composition API |
| `i18n` | Options used by `vue-i18n` |
| `identity.cognito` | Cognito settings for authentication |
| `routes` | List of `vue-router` routes, to register application pages |
| `clean` | Function called on logout, typically used to delete personal data from `pinia` stores |

See the full definition of options [here](/packages/core-vue3/src/types/options.ts).

You can find a sample of these configuration options in the [sample app options](/packages/playground/src/data/config.ts).

--- 

## Contribute

Feel free to push your code if you agree with publishing under the [MIT license](./LICENSE).
