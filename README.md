# @amilochau/core-vue3

## Introduction

`@amilochau/core-vue3` is a opinionated package used to initialize vue 3 applications.

The following plugins are installed by `@amilochau/core-vue3`:
- `vue-router`
- `pinia`
- `msal`
- `vue-i18n`
- `vuetify`

The following libraries are used, and are defined as dependencies:
- `@mdi/js` for icons
- `axios` for HTTP requests
- `moment` for dates
- `numeral` for numerals
- `webfontloader` with Roboto fontface
- `@vueuse/core` and `@vueuse/head` as vue helpers

---

## Integration

To integrate the `@amilochau/core-vue3` package, you must follow these steps.

1. Install the npm package

Run the following command to install the npm package:

```pwsh
npm install @amilochau/core-vue3
```

2. Create and configure the plugin

Create a dedicated file (typically `milochau-core.ts` in your `src/plugins` folder) to create and configure the plugin:

```typescript
import { createMilochauCore } from '@amilochau/core-vue3'

// Create and export options
export const coreOptions: MilochauCoreOptions = {
  application: {
    name: 'YOU APPLICATION NAME',
    contact: 'YOUR APPLICATION OWNER',
    navigation: (t) => [
      // YOUR APPLICATION NAVIGATION LINKS
    ]
  },
  api: {
    gatewayUri: 'YOUR API BASE URI'
  },
  messages: {
    en: {}, // <== USE THIS SECTION TO ADD ENGLISH TRANSLATIONS
    fr: {}  // <== USE THIS SECTION TO ADD FRENCH TRANSLATIONS
  },
  identity: {
    authorities: authorities,
    scopes: {
      use: 'THE SCOPE TO USE FOR API AUTHORIZATION',
    },
    auth: {
      clientId: 'THE CLIENT ID OF YOUR APPLICATION',
      authority: authorities.register_login,
      knownAuthorities: ['THE AUTHORITY OF YOUR IDENTITY PROVIDER'],
      redirectUri: 'THE REDIRECT URI TO CALL AFTER AUTHENTICATION',
      postLogoutRedirectUri: 'THE REDIRECT URI TO CALL AFTER LOGOUT'
    },
    loginRequest: {
      scopes: [
        scopes.use
      ],
    }
  },
  routes: [], // <== USE THIS SECTION TO ADD ROUTES
  clean: () => {
    // WHAT TO USE, TO BE CALLED ON THE NEXT FUNCTION

    return () => {
      // WHAT TO CALL TO CLEAN LOCAL DATA ON LOGOUT
    }
  }
}

// Create the plugin to be registred
export default createMilochauCore(coreOptions)
```

3. Register the plugin

In your main file (typically `main.ts`), use the plugin as follows:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import milochauCore from './plugins/milochau-core'

const app = createApp(App);
app.use(milochauCore); // <== This line registers the plugin
```

## Result

When the plugin is registred, you can focus to create business code in your application.

The plugin presents your pages (defined with the `routes` configuration) in a pre-defined template, with a navigation drawer, an application bar, menus for user settings and user account, a cookie bar and privacy page.

Many helpers can be used from your code, via the Composition API.

## Composition API

Here are the helpers you can use from your code.

| Helper | Description |
| ------ | ----------- |
| `useApi` | Sends HTTP requests to the API gateway configured via `api.gatewayUri` ; manages HTTP errors |
| `useClean` | Cleans data from storage, typically on logout, as configured via `clean` |
| `useCoreOptions` | Lets you get the core options defined on plugin registration |
| `useMsal` | Gets MSAL current instance, user account info, and user account functions |
| `useIsAuthenticated` | Lets you know if the current user is authenticated via MSAL |
| `useMsalAuthenticated` | Lets you acquire token from MSAL to send requests |
| `useValidationRules` | Lets you use pre-defined validation rules on plain data |

Here are the `pinia` stores you can use from your code.

| Store name | Helper | Description |
| ---------- | ------ | ----------- |
| `app` | `useAppStore` | Lets you display messages in a snackbar, and add meta args to be used in page title and description |
| `cookies` | `useCookiesStore` | Lets you known if the current user has accepted cookies |
| `language` | `useLanguageStore` | Lets you know the current language configured for the UI |
| `theme` | `useThemeStore` | Lets you know the current theme configured for the UI |

## Options

Here are the options you should provide in the `MilochauCoreOptions` class.

| Configuration path | Description |
| ------------------ | ----------- |
| `application.name` | Name of the application, as used in the page title, page description, and policy page |
| `application.contact` | Application owner, as used in the policy page |
| `application.navigation` | Navigation links, as `vuetify` list items, used in the navigation drawer |
| `api.gatewayUri` | Base URI used by the `useApi` composition API |
| `messages` | Messages used by `vue-i18n` |
| `identity.authorities.register_login` | Authority URI used to authenticate users and get tokens for API requests |
| `identity.authorities.profile_editing` | Authority URI used to let users edit their profile information |
| `identity.scopes.use` | URI of the scope used to let user make API requests |
| `identity.auth.clientId` | ClientID of the current application, as defined in the identity provider |
| `identity.auth.authority` | Authority used to perform API requets; typically set to `identity.authorities.register_login` |
| `identity.auth.knownAuthorities` | List of know authorities for authentication |
| `identity.auth.redirectUri` | Redirect URI to call after authentication |
| `identity.auth.postLogoutRedirectUri` | Redirect URI to call after logout |
| `identity.loginRequest.scopes` | Scopes to include in the login request |
| `routes` | List of `vue-router` routes, to register application pages |
| `clean` | Function called on logout, typically used to delete personal data from `pinia` stores |

You can find a sample of these configuration options in the [sample app options](/packages/playground/src/data/config.ts).

--- 

## Contribute

Feel free to push your code if you agree with publishing under the [MIT license](./LICENSE).
