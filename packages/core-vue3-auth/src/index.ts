import type { App } from 'vue'
import type { Router } from 'vue-router'
import type { Pinia } from 'pinia'
import { CoreVue3, type MilochauCoreOptions } from '@amilochau/core-vue3'

import cognito from './plugins/cognito'
import routes from './data/routes'

export const CoreVue3Auth = (
  options: MilochauCoreOptions,
  fn?: (context: { app: App, pinia: Pinia, router: Router }) => Promise<any>,
) => {
  const createApp = async () => {
    options.routes.push(...routes)
    return CoreVue3(options, async (context) => {
      context.app.use(cognito, options);
      fn?.(context);
    })()
  }

  return createApp
}

export * from './composition'
export * from './types'
