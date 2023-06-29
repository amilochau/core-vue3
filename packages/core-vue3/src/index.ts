import { type App, type Component, createApp as createClientApp } from 'vue'
import type { MilochauCoreOptions } from './types/options'

import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'

import i18n, { registerI18n } from './plugins/i18n'
import head, { registerHead } from './plugins/head'
import vuetify, { registerVuetify } from './plugins/vuetify'
import pinia, { registerPinia } from './plugins/pinia'
import router, { registerRouter } from './plugins/router'

// Styles
import './styles/main.scss'

export default {
  install: (app: App, options: MilochauCoreOptions) => {
    // Provide options availble through 'inject'
    app.provide('core-options', options)

    // Install plugins
    app.use(i18n, options);
    app.use(head, options);
    app.use(vuetify, options);
    app.use(pinia, options);
    app.use(router, options); // Mount app, so should be the last one
  }
}

export function CoreVue3(
  App: Component,
  options: MilochauCoreOptions,
  fn?: (context: { app: App }) => Promise<any>,
) {
  async function createApp() {
    const app = createClientApp(App);
    
    app.provide('core-options', options)

    const i18n = registerI18n(app, options)
    const head = registerHead(app, options)
    const vuetify = registerVuetify(app, options)
    const pinia = registerPinia(app, options)
    const router = registerRouter(app, options)

    await fn?.({ app })

    // @todo Add ctx.app, ctx.router handlers

    app.use(router);
    
    return {
      app,
      head,
      router,
      i18n,
      pinia,
      vuetify,
    }
  }

  (async () => {
    const { app, router } = await createApp()
    // wait until page component is fetched before mounting
    await router.isReady()
    app.mount("#app", true)
  })()

  return createApp
}

export * from './composition'
export * from './stores'
export * from './types'
