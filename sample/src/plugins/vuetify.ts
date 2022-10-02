// Styles
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { fr } from 'vuetify/locale'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  lang: {
    locales: {
      messages: {
        fr
      }
    }
  }
})
