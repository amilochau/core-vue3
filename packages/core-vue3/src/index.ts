import type { App } from 'vue'
import type { MilochauCoreOptions } from './types/options'

import cognito from './plugins/cognito'
import i18n from './plugins/i18n'
import head from './plugins/head'
import vuetify from './plugins/vuetify'
import pinia from './plugins/pinia'
import router from './plugins/router'

let coreOptions: MilochauCoreOptions

const createMilochauCore = (options: MilochauCoreOptions) => {

  // Instantiate static values
  coreOptions = options

  // Define plugin to install
  const milochauCorePlugin = {
    install: (app: App) => {

      // Provide options availble through 'inject'
      app.provide('core-options', options)

      // Install plugins
      app.use(cognito, options);
      app.use(i18n, options);
      app.use(head, options);
      app.use(vuetify, options);
      app.use(pinia, options);
      app.use(router, options); // Mount app, so should be the last one
    }
  }

  return milochauCorePlugin
}

export { createMilochauCore, coreOptions }

export * from './composition'
export * from './stores'
export * from './types'
