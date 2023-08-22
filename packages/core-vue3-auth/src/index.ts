import type { App } from 'vue'
import type { Router } from 'vue-router'
import type { Pinia } from 'pinia'
import { createCoreVue3App, type MilochauCoreOptions } from '@amilochau/core-vue3'

import cognito from './plugins/cognito'
import routes from './data/routes'

export const createCoreVue3AuthApp = (
  options: MilochauCoreOptions,
  fn?: (context: { app: App, pinia: Pinia, router: Router }) => Promise<any>,
) => {
  options.routes.push(...routes)
  return createCoreVue3App(options, async (context) => {
    context.app.use(cognito, options);
    fn?.(context);
  })
}

export * from './composition'
export * from './types'
