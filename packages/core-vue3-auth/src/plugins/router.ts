import { useAppStore, useIdentityStore } from '@amilochau/core-vue3/stores';
import type { CoreVue3Context } from '@amilochau/core-vue3/types';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

declare module 'vue-router' {
  /** Extended interface for routes. */
  interface RouteMeta {
    /** Whether the route allows anonymous access. */
    allowAnonymous?: boolean
  }
}

/**
 * Register router guards.
 * @param router Router instance.
 * @param identityStore Identity store.
 * @param appStore App store.
 */
export const registerRouterGuards = (context: CoreVue3Context) => {
  const identityStore = useIdentityStore(context.pinia);
  const appStore = useAppStore(context.pinia);

  context.router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    // Hide snackbar if lang changes
    if (to.params.lang !== from.params.lang) {
      appStore.hideMessage();
    }

    // Check if target route is protected
    if (!to.meta.allowAnonymous && !identityStore.isAuthenticated) {
      next({ name: 'Login', params: { lang: to.params.lang }, query: { returnUrl: to.fullPath } });
      return;
    }

    next(); // make sure to always call next()!
  });
};
