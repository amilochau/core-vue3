import { App } from 'vue'
import { PublicClientApplication } from '@azure/msal-browser'

import { MilochauCoreOptions } from './types/options'

import i18n from './plugins/i18n'
import head from './plugins/head'
import vuetify from './plugins/vuetify'
import msal from './plugins/msal'
import pinia from './plugins/pinia'

let msalInstance: PublicClientApplication

const createMilochauCore = (options: MilochauCoreOptions) => {

  // Create msalInstance
  msalInstance = msal.createInstance(options)

  // Define plugin to install
  const milochauCorePlugin = {
    install: (app: App) => {

      // Provide options availble through 'inject'
      app.provide('core-options', options)

      // Install plugins
      app.use(i18n, options);
      app.use(head, options);
      app.use(vuetify, options);
      app.use(msal, msalInstance);
      app.use(pinia);

    }
  }

  return milochauCorePlugin
}

export { createMilochauCore, msalInstance }

export * from './composition'
export * from './models'
export * from './stores'
export * from './types'
