import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import routes from '../../data/routes'
import { registerGuards } from './guards'
import { type App } from 'vue'
import type { MilochauCoreOptions } from '../../types'
import { useIdentityStore, useLanguageStore } from '../../stores'
import type { Pinia } from 'pinia'
import PageRoot from '../../pages/PageRoot.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

export const registerRouter = (app: App, pinia: Pinia, options: MilochauCoreOptions) => {
  const languageStore = useLanguageStore(pinia)
  const identityStore = useIdentityStore(pinia)

  const routesWithRedirection: Array<RouteRecordRaw> = [
    {
      path: '/:lang([a-z]{2})',
      component: PageRoot,
      children: options.routes.concat(routes)
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: to => {
        return {
          path: `/${languageStore.language}${to.fullPath}`
        }
      }
    }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes: routesWithRedirection,
    scrollBehavior: async (to, from, savedPosition) => {
      // Wait for initial page load, or for cross page navigation
      if (!document.querySelector('main') || to.path !== from.path && to.hash) {
        await (new Promise(resolve => setTimeout(resolve, 500)))
      }

      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
          top: 48,
        }
      } else if (savedPosition) {
        return savedPosition
      }
      else {
        return {
          top: 0
        }
      }
    },
  })

  // Register guards
  registerGuards(router, identityStore);

  return router
}
