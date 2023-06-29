import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import routes from '../../data/routes'
import { registerGuards } from './guards'
import { type App } from 'vue'
import type { MilochauCoreOptions } from '../../types'
import { useIdentityStore, useLanguageStore } from '../../stores'
import type { Pinia } from 'pinia'

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
      component: () => import('../../pages/PageRoot.vue'),
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
    // @todo Add scrollBehavior
  })

  // Register guards
  registerGuards(router, identityStore);

  return router
}
