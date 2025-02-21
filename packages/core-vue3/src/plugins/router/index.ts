import { type RouteLocationGeneric, type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { type App } from 'vue';
import type { CoreVue3Options } from '../../types';

declare module 'vue-router' {
  /** Extended interface for routes. */
  interface RouteMeta {
    // @todo Move that to @amilochau/core-vue3-auth
    // requiresAuth?: boolean

    generateSsg?: boolean
    noindex?: boolean
    metadata: {
      en: {
        title: string | undefined
        description: string | undefined
      },
      fr: {
        title: string | undefined
        description: string | undefined
      }
    }
  }
}

/**
 * Register vue-router.
 * @param app App instance.
 * @param options Core Options.
 */
export const registerRouter = (app: App, options: CoreVue3Options) => {
  const routes: RouteRecordRaw[] = [
    ...options.router.routes,
  ];

  routes[0].children?.push(...[
    {
      name: 'Settings',
      path: 'settings',
      component: () => import('../../pages/PageSettings.vue'),
      meta: {
        generateSsr: true,
        noindex: true,
        metadata: {
          en: { title: 'Settings', description: 'Settings' },
          fr: { title: 'Paramètres', description: 'Paramètres' },
        },
      },
    },
    {
      name: 'Forbidden',
      path: 'forbidden',
      component: () => import('../../pages/PageForbidden.vue'),
      meta: {
        generateSsr: false,
        noindex: true,
        metadata: {
          en: { title: 'Forbidden', description: 'Forbidden' },
          fr: { title: 'Accès non autorisé', description: 'Accès non autorisé' },
        },
      },
    },
    {
      name: 'NotFound',
      path: ':path(.*)*',
      component: () => import('../../pages/PageNotFound.vue'),
      meta: {
        generateSsr: false,
        noindex: true,
        metadata: {
          en: { title: 'Page Not Found', description: 'Page Not Found' },
          fr: { title: 'Page introuvable', description: 'Page introuvable' },
        },
      },
    },
  ]);

  routes.push({
    path: '/:path(.*)*',
    redirect: (to: RouteLocationGeneric) => `/en${to.fullPath}`.replace(/\/$/, ''),
  });

  const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: async (to, from, savedPosition) => {
      // Wait for initial page load, or for cross page navigation
      if (!document.querySelector('main') || to.path !== from.path && to.hash) {
        await (new Promise(resolve => setTimeout(resolve, 500)));
      }

      if (to.hash) {
        return { el: to.hash, behavior: 'smooth', top: 48 };
      } else {
        return { top: 0 };
      }
      // Note: no saved position here, as it works badly with transitions
    },
    ...options.router,
    routes,
  });

  // Register guards
  // @todo Move that to @amilochau/core-vue3-auth
  // const identityStore = useIdentityStore(pinia);
  // const appStore = useAppStore(pinia);
  // registerGuards(router, identityStore, appStore, coreOptions);

  return router;
};
