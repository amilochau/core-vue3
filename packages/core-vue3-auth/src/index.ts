import type { App } from 'vue'
import type { MilochauCoreOptions } from '@amilochau/core-vue3'

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

export * from './composition'
export * from './types'
