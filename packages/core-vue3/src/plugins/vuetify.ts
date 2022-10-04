// Styles
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { en, fr } from 'vuetify/locale'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg'
import { App } from 'vue'
import { MilochauCoreOptions } from '../types/options'

const coreCreateVuetifyPlugin = {
  install(app: App, options: MilochauCoreOptions) {
    
    const vuetify = createVuetify({
      icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi
        }
      },
      locale: {
        messages: {
          en,
          fr
        }
      }
    })

    app.use(vuetify)
  
    return vuetify
  }
}

export default coreCreateVuetifyPlugin
