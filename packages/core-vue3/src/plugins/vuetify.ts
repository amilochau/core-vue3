import type { App } from 'vue'
import type { MilochauCoreOptions } from '../types/options'

// Vuetify
import { type VuetifyOptions, createVuetify } from 'vuetify'
import { en, fr } from 'vuetify/locale'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export const registerVuetify = (app: App, options: MilochauCoreOptions) => {
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
    },
    defaults: {
      VCardTitle: {
        class: 'multi-line'
      },
      VCardSubtitle: {
        class: 'multi-line'
      },
      VListItemTitle: {
        class: 'multi-line',
      },
      VListItemSubtitle: {
        class: 'multi-line'
      },
      VListSubheader: {
        class: 'multi-line'
      }
    }
  }

  const vuetifyOptions = Object.assign(defaultVuetifyOptions, options.vuetify || {})
  const vuetify = createVuetify(vuetifyOptions)

  app.use(vuetify)

  return vuetify
}
