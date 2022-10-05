import { App } from 'vue'

import { MilochauCoreOptions } from './types/options'

console.log('core - index - 1 - start file')

import i18n from './plugins/i18n'
import head from './plugins/head'
import vuetify from './plugins/vuetify'
import msal from './plugins/msal'
import pinia from './plugins/pinia'

import { useApi } from './composition/api'

import { PublicClientApplication } from '@azure/msal-browser'

console.log('core - index - 2 - after imports')

let msalInstance: PublicClientApplication

const createMilochauCore = (options: MilochauCoreOptions) => {

  console.log('core - index - 3 - start create')

  // Create msalInstance
  msalInstance = msal.createInstance(options)

  // Define plugin to install
  const milochauCorePlugin = {
    install: (app: App) => {

      console.log('core - index - 4 - start install')

      // Install plugins
      app.use(i18n, options);
      app.use(head, options);
      app.use(vuetify, options);
      app.use(msal, msalInstance);
      app.use(pinia);

      console.log('core - index - 5 - end install')

    }
  }

  console.log('core - index - 6 - end create')


  return milochauCorePlugin
}

export { createMilochauCore,
  msalInstance,
  useApi
}

console.log('core - index - 7 - end file')
