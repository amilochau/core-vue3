import { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router";

export function registerGuards(router: Router, identityStore: any) {
  router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    if (to.meta.requiresAuth) {

      if (!identityStore.isAuthenticated) {
        next('/login') // @todo { name: 'Login' } does not work (lang is required)
        return;
      }
    }

    next(); // make sure to always call next()!
  });
}
