import type { CoreOptions } from '../..//types';
import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';

/**
 * Register router guards.
 * @param router Router instance.
 * @param identityStore Identity store.
 * @param appStore App store.
 * @param coreOptions Core options.
 */
export const registerGuards = (router: Router, identityStore: any, appStore: any, coreOptions: CoreOptions) => {
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    // Hide snackbar if lang changes
    if (to.params.lang !== from.params.lang) {
      appStore.hideMessage('snackbar');
    }

    // Check if target route is protected
    if (to.meta.requiresAuth && !identityStore.isAuthenticated) {
      if (coreOptions.identity && router.hasRoute('Login')) {
        next({ name: 'Login', params: { lang: to.params.lang }, query: { returnUrl: to.fullPath } });
        return;
      } else {
        next({ name: 'Forbidden', params: { lang: to.params.lang } });
        return;
      }
    }

    next(); // make sure to always call next()!
  });
};
