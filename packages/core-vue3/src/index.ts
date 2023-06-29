import { type App, type Component, createApp as createClientApp } from 'vue'
import type { Router } from 'vue-router'
import type { Pinia } from 'pinia'
import type { MilochauCoreOptions } from './types/options'

import { registerI18n } from './plugins/i18n'
import { registerHead } from './plugins/head'
import { registerVuetify } from './plugins/vuetify'
import { registerPinia } from './plugins/pinia'
import { registerRouter } from './plugins/router'

// Styles
import './styles/main.scss'

export function CoreVue3(
  App: Component,
  options: MilochauCoreOptions,
  fn?: (context: { app: App, pinia: Pinia, router: Router }) => Promise<any>,
) {
  async function createApp() {
    const app = createClientApp(App);
    
    app.provide('core-options', options)

    const i18n = registerI18n(app, options)
    const head = registerHead(app, options)
    const vuetify = registerVuetify(app, options)
    const pinia = registerPinia(app, options)
    const router = registerRouter(app, pinia, options)

    await fn?.({ app, pinia, router })

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
