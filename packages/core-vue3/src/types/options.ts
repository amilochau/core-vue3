import type { Ref } from 'vue';
import type { I18nOptions } from 'vue-i18n';
import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import type { VuetifyOptions } from 'vuetify';
import type { NotificationsRegisterRequest } from './application/notifications';

/** Core options, to configure `@amilochau/core-vue3` plugin. */
export type CoreOptions = {
  /** Application options. */
  application: {
    /** Application name. */
    name: string,
    /** Application contact, as displayed in the Contact page. */
    contact: string,
    /** URL of the application logo. */
    logoUrl?: string,
    /** Navigation options - used in the navigation drawer. */
    navigation: () => {
      items: Ref<any[]>,
      appendItems?: Ref<any[]>,
    },
  },
  /** API options. */
  api?: {
    /** Method to create the base URI in API composition. */
    buildApiBaseUri: (context: { relativeBaseUri: string }) => string,
  },
  /** I18n options. */
  i18n: I18nOptions & { messages: CoreOptionsMessages },
  /** Vuetify options. */
  vuetify?: VuetifyOptions,
  /** Identity options. */
  identity?: {
    /** Cognito settings. */
    cognito: {
      /** Cognito user pool id. */
      userPoolId: string,
      /** Application client id. */
      clientId: string,
    },
    /** Whether the users migration is disabled. */
    usersMigrationDisabled?: boolean,
  },
  /** Routes options. */
  routes: Array<RouteRecordRaw>,
  /** Vue component used as a root component for every route-based page. */
  rootComponent?: RouteComponent,
  /** Clean method, typically called on logout. */
  clean: () => () => void,
  /** PWA options. */
  pwa?: {
    /** Whether to hide the PWA installation button. */
    hideInstallBtn: boolean,
  },
  /** Notification options. */
  notifications?: {
    /** Push key, used by Web Push. */
    pushKey: string,
    /** Notifications register method, typically called when the user registers to notifications. */
    register: () => (request: NotificationsRegisterRequest) => Promise<void>,
  },
};

/** Core options, to configure `@amilochau/core-vue3` internal messages. */
export type CoreOptionsMessages = {
  [lang: string]: {
    appTitle: string,
  }
};

/** Environment options. */
export type EnvironmentOptions = {
  /** Environment variables. */
  variables: Record<string, any>,
  /** Whether the current environment is considered as a production environment. */
  isProduction: boolean,
};

/** Core options with environment options. */
export type CoreEnvironmentOptions = CoreOptions & EnvironmentOptions;
