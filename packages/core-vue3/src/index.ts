import { App } from 'vue'

import { MilochauCoreOptions } from './types/options'

import i18n from './plugins/i18n'
import head from './plugins/head'
import vuetify from './plugins/vuetify'

const createMilochauCore = (options: MilochauCoreOptions) => {

  const milochauCorePlugin = {
    install(app: App) {

      // Install plugins
      app.use(i18n, options);
      app.use(head, options);
      app.use(vuetify, options);
      
    }
  }

  return milochauCorePlugin
}

export { createMilochauCore }
