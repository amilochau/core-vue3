import type { App, Component } from 'vue'
import type { Router } from 'vue-router'
import type { Pinia } from 'pinia'
import { CoreVue3, type MilochauCoreOptions } from '@amilochau/core-vue3'

import cognito from './plugins/cognito'
import routes from './data/routes'

export default {
  install: (app: App, options: MilochauCoreOptions) => {
    // Add identity routes
    options.routes.push(...routes)

    // Install plugins
    app.use(cognito, options);
  }
}

export const CoreVue3Auth = (
  App: Component,
  options: MilochauCoreOptions,
  fn?: (context: { app: App, pinia: Pinia, router: Router }) => Promise<any>,
) => {
  const createApp = async () => {
    options.routes.push(...routes)
    return CoreVue3(App, options, async (context) => {
      context.app.use(cognito, options);
      fn?.(context);
    })
  }

  return createApp
}

export * from './composition'
export * from './types'
