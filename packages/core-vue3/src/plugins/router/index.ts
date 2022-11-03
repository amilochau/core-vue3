import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PageRoot from '../../pages/PageRoot.vue'
import routes from '../../data/routes'
import { registerGuards } from './guards'
import { App } from 'vue'
import { MilochauCoreOptions } from '../../types'
import { PublicClientApplication } from '@azure/msal-browser'
import { CustomNavigationClient } from './navigation-client'
import merge from 'deepmerge'
import { useLanguageStore } from '../../stores'

export default {
  install: (app: App, msalInstance: PublicClientApplication, options: MilochauCoreOptions) => {
    const languageStore = useLanguageStore()
    
    const routesWithRedirection: Array<RouteRecordRaw> = [
      {
        path: '/',
        redirect: () => {
          return { path: `/${languageStore.language}` }
        }
      },
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
    registerGuards(router);

    // Use router for MSAL redirections
    const navigationClient = new CustomNavigationClient(router);
    msalInstance.setNavigationClient(navigationClient);

    app.use(router)

    // Mount app when ready
    router.isReady().then(() => {
      app.mount('#app');
    })

    return router
  }
}
