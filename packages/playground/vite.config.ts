import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import ViteFonts from 'vite-plugin-fonts'
import { setDefaultResultOrder } from 'dns'

setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    vueI18n(),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    })
  ]
})
