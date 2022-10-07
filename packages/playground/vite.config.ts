import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { setDefaultResultOrder } from 'dns'

setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    vueI18n()
  ]
})
