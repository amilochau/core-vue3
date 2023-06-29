import type { App } from 'vue'
import type { MilochauCoreOptions } from './types/options'

import i18n from './plugins/i18n'
import head from './plugins/head'
import vuetify from './plugins/vuetify'
import pinia from './plugins/pinia'
import router from './plugins/router'

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

export * from './composition'
export * from './stores'
export * from './types'
