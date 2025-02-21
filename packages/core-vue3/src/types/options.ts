import type { App, MaybeRef, Ref } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';
import type { RouteComponent, RouteRecordRaw, Router, RouterOptions } from 'vue-router';
import type { VuetifyOptions } from 'vuetify';
import type { NotificationsRegisterRequest } from './application/notifications';
import type { MergeHead, VueHeadClient } from '@unhead/vue';
import type { Pinia } from 'pinia';

/** Application options. */
export interface CoreVue3AppOptions {
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
  i18n?: I18nOptions,
  /** `vuetify` options. */
  vuetify?: VuetifyOptions,

  /** Application options. */
  application: CoreVue3AppOptions,
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
