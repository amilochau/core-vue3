import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import routes from '../../data/routes';
import { registerGuards } from './guards';
import { type App } from 'vue';
import type { CoreOptions } from '../../types';
import { useAppStore, useIdentityStore, useLanguageStore } from '../../stores';
import type { Pinia } from 'pinia';
import PageRoot from '../../pages/PageRoot.vue';

declare module 'vue-router' {
  /** Extended interface for routes. */
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

/**
 * Register vue-router.
 * @param app App instance.
 * @param pinia Pinia instance.
 * @param coreOptions Core options.
 */
export const registerRouter = (app: App, pinia: Pinia, coreOptions: CoreOptions) => {
  const languageStore = useLanguageStore(pinia);
  const identityStore = useIdentityStore(pinia);
  const appStore = useAppStore(pinia);

  const rootRoute: RouteRecordRaw = {
    path: '/:lang([a-z]{2})',
    component: PageRoot,
    children: coreOptions.rootComponent ? [
      {
        path: '',
        component: coreOptions.rootComponent,
        children: coreOptions.routes.concat(routes),
      } as RouteRecordRaw,
    ] : coreOptions.routes.concat(routes),
  };

  const redirectionRoute: RouteRecordRaw = {
    path: '/:pathMatch(.*)*',
    /**
     * Redirection using the language.
     * @param to Target route.
     */
    redirect: to => {
      return {
        path: `/${languageStore.language}${to.fullPath}`,
      };
    },
  };

  const routesWithRedirection: Array<RouteRecordRaw> = [
    rootRoute,
    redirectionRoute,
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes: routesWithRedirection,
    /**
     * Scroll behavior.
     * @param to Target route.
     * @param from Origin route.
     * @param savedPosition Saved position.
     */
    scrollBehavior: async (to, from, savedPosition) => {
      // Wait for initial page load, or for cross page navigation
      if (!document.querySelector('main') || to.path !== from.path && to.hash) {
        await (new Promise(resolve => setTimeout(resolve, 500)));
      }

      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
          top: 48,
        };
      } else {
        return {
          top: 0,
        };
      }
      // Note: no saved position here, as it works badly with transitions
    },
  });

  // Register guards
  registerGuards(router, identityStore, appStore, coreOptions);

  return router;
};
