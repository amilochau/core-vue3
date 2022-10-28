import { App } from 'vue'
import { PublicClientApplication } from '@azure/msal-browser'

import { MilochauCoreOptions } from './types/options'

import i18n from './plugins/i18n'
import head from './plugins/head'
import vuetify from './plugins/vuetify'
import msal from './plugins/msal'
import pinia from './plugins/pinia'
import router from './plugins/router'

let msalInstance: PublicClientApplication
let coreOptions: MilochauCoreOptions

const createMilochauCore = (options: MilochauCoreOptions) => {

  // Instantiate static values
  msalInstance = msal.createInstance(options)
  coreOptions = options

  // Define plugin to install
  const milochauCorePlugin = {
    install: (app: App) => {

      // Provide options availble through 'inject'
      app.provide('core-options', options)

      // Install plugins
      app.use(i18n, options);
      app.use(head, options);
      app.use(vuetify, options);
      app.use(msal, msalInstance, options);
      app.use(pinia, options);
      app.use(router, msalInstance, options); // Mount app, so should be the last one
    }
  }

  return milochauCorePlugin
}

export { createMilochauCore, msalInstance, coreOptions }

export * from './composition'
export * from './stores'
export * from './types'
