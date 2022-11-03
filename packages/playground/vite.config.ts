import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import ViteFonts from 'vite-plugin-fonts'
import { setDefaultResultOrder } from 'dns'
import analyze from 'rollup-plugin-analyzer'

setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    vueI18n({
      fullInstall: false
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    analyze({ summaryOnly: true })
  ]
})
