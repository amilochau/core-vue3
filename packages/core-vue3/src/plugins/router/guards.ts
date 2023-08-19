import type { MilochauCoreOptions } from "../..//types";
import type { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router";

export const registerGuards = (router: Router, identityStore: any, options: MilochauCoreOptions) => {
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    if (to.meta.requiresAuth && !identityStore.isAuthenticated) {
      if (options.identity && router.hasRoute('Login')) {
        next({ name: 'Login', params: { lang: to.params.lang } })
        return;
      } else {
        next({ name: 'Forbidden', params: { lang: to.params.lang } })
        return;
      }
    }

    next(); // make sure to always call next()!
  });
}
