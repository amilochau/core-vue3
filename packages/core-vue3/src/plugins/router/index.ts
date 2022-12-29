import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PageRoot from '../../pages/PageRoot.vue'
import routes from '../../data/routes'
import { registerGuards } from './guards'
import { App } from 'vue'
import { MilochauCoreOptions } from '../../types'
import merge from 'deepmerge'
import { useIdentityStore, useLanguageStore } from '../../stores'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

export default {
  install: (app: App, options: MilochauCoreOptions) => {
    const languageStore = useLanguageStore()
    const identityStore = useIdentityStore()

    const routesWithRedirection: Array<RouteRecordRaw> = [
      {
        path: '/:lang([a-z]{2})',
        component: PageRoot,
        children: merge(routes, options.routes)
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

    app.use(router)

    // Mount app when ready
    router.isReady().then(() => {
      app.mount('#app');
    })

    return router
  }
}
