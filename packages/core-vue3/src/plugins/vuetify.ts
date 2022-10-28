import { App } from 'vue'
import { MilochauCoreOptions } from '../types/options'

// Vuetify
import { createVuetify } from 'vuetify'
import { en, fr } from 'vuetify/locale'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg'

export default {
  install: (app: App, options: MilochauCoreOptions) => {

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
