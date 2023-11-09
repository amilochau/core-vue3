import type { App } from 'vue'
import type { MilochauCoreOptions } from '../types/options'
import deepmerge from 'deepmerge'

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
        class: 'multi-line',
      },
      VCardSubtitle: {
        class: 'multi-line',
      },
      VListItemTitle: {
        class: 'multi-line',
      },
      VListItemSubtitle: {
        class: 'multi-line',
      },
      VListSubheader: {
        class: 'multi-line',
      },
      VTimeline: {
        align: 'start',
        density: 'compact',
        side: 'end',
        VTimelineItem: {
          lineInset: 2,
        },
      },
      // Form inputs & controls
      VSwitch: {
        density: 'comfortable',
        hideDetails: 'auto',
        class: "mb-3",
        color: 'primary',
      },
      VTextField: {
        variant: 'underlined',
        density: 'comfortable',
        hideDetails: 'auto',
        class: "mb-3",
      },
      VTextarea: {
        variant: 'underlined',
        density: 'comfortable',
        hideDetails: 'auto',
        class: "mb-3",
        autoGrow: true,
        rows: 3,
      },
      VInput: {
        variant: 'underlined',
        hideDetails: 'auto',
      },
      VDialog: {
        VForm: {
          class: 'fill-height overflow-y-auto',
        },
      },
    }
  }

  const vuetifyOptions = deepmerge(defaultVuetifyOptions, options.vuetify || {})
  const vuetify = createVuetify(vuetifyOptions)

  app.use(vuetify)

  return vuetify
}
