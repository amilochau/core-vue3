import { App } from 'vue'
import { MilochauCoreOptions } from '../types/options'

// Vuetify
import { createVuetify } from 'vuetify'
import { en, fr } from 'vuetify/locale'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg'
import { VuetifyOptions } from 'vuetify/framework'
import merge from 'deepmerge'

export default {
  install: (app: App, options: MilochauCoreOptions) => {

    const defaultVuetifyOptions: VuetifyOptions = {
      theme: {
        themes: {
          light: {
            colors: {
              background: '#fcfcfc'
            }
          }
        }
      },
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
    }

    const vuetifyOptions = options.vuetify ? merge(defaultVuetifyOptions, options.vuetify) : defaultVuetifyOptions
    const vuetify = createVuetify(vuetifyOptions)

    app.use(vuetify)

    return vuetify
  }
}
