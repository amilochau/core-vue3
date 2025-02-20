import type { App, MaybeRef, Ref } from 'vue';
import type { I18n, VueI18nOptions } from 'vue-i18n';
import type { RouteComponent, RouteRecordRaw, Router, RouterOptions } from 'vue-router';
import type { VuetifyOptions } from 'vuetify';
import type { NotificationsRegisterRequest } from './application/notifications';
import type { MergeHead, VueHeadClient } from '@unhead/vue';
import type { Pinia } from 'pinia';

/** Application options. */
export interface CoreVue3ApplicationOptions {
  /** Function to build a Contact URL. */
  contactUrlBuilder: (lang: MaybeRef<string>) => string,
  /** Function to build a Privacy URL. */
  privacyUrlBuilder: (lang: MaybeRef<string>) => string,
}

/** Options, to configure `@amilochau/core-vue3` plugin. */
export interface CoreVue3Options {
  /** `vue-router` options. */
  router: Omit<RouterOptions, 'history'> & Partial<Pick<RouterOptions, 'history'>>
  /** `vue-i18n` options. */
  i18n?: VueI18nOptions,
  /** `vuetify` options. */
  vuetify?: VuetifyOptions,

  /** Application options. */
  application: CoreVue3ApplicationOptions,
}

/** Options, to configure `@amilochau/core-vue3` plugin. */
export interface CoreVue3Context {
  app: App<Element>
  router: Router
  routes: Readonly<RouteRecordRaw[]>
  head: VueHeadClient<MergeHead>
  i18n: I18n
  vuetify: any
  pinia: Pinia
}

/** Core options, to configure `@amilochau/core-vue3` plugin. */
export type CoreOptions = {
  /** API options. */
  api?: {
    /** Method to create the base URI in API composition. */
    apiBaseUriBuilder: (context: { apiName: string }) => string,
  },
  // @todo Move that to @amilochau/core-vue3-auth
  ///** Identity options. */
  //identity?: {
  //  /** Cognito settings. */
  //  cognito: {
  //    /** Cognito user pool id. */
  //    userPoolId: string,
  //    /** Application client id. */
  //    clientId: string,
  //  },
  //  /** Whether the users migration is disabled. */
  //  usersMigrationDisabled?: boolean,
  //},
  /** Clean method, typically called on logout. */
  clean: () => () => void,
  // @todo Move that to @amilochau/core-vue3-pwa
  ///** PWA options. */
  //pwa?: {
  //  /** Whether to hide the PWA installation button. */
  //  hideInstallBtn: boolean,
  //},
  // @todo Move that to @amilochau/core-vue3-notifications ?
  ///** Notification options. */
  //notifications?: {
  //  /** Push key, used by Web Push. */
  //  pushKey: string,
  //  /** Notifications register method, typically called when the user registers to notifications. */
  //  register: () => (request: NotificationsRegisterRequest) => Promise<void>,
  //},
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
