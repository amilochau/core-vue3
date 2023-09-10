import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Unfonts from 'unplugin-fonts/vite'
import { setDefaultResultOrder } from 'dns'
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from 'vite-plugin-pwa'
import path from 'upath'
import fs from 'fs'
import { execSync } from 'child_process'

setDefaultResultOrder('verbatim')

process.env.VITE_BUILD_DATE = new Date().toISOString()
process.env.VITE_COMMIT_SHA = execSync('git rev-parse --short HEAD').toString()
process.env.VITE_COMMIT_DATE = execSync('git log -1 --format=%cI').toString()

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true // Opt-in feature, see https://github.com/vuejs/rfcs/discussions/503
      }
    }),
    vuetify(),
    VueI18n({
      fullInstall: false,
      compositionOnly: true,
      runtimeOnly: false,
    }),
    Unfonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    VitePWA({
      srcDir: 'src',
      filename: 'service-worker.js',
      strategies: 'injectManifest',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png}'],
        maximumFileSizeToCacheInBytes: 24 * 1024 ** 2, // 24 MB - To avoid precaching too large files
      },
      includeManifestIcons: false,
      manifest: {
        name: 'core-vue3 - Playground',
        description: 'Test @amilochau/core-vue3',
        short_name: 'Playground',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
        ]
      },
      devOptions: {
        enabled: true
      },
    }),
    {
      name: 'amilochau:fallback',
      enforce: 'post',
      transformIndexHtml (html) {
        fs.mkdirSync('dist', { recursive: true })
        fs.writeFileSync(path.join('dist/_fallback.html'), html)
      },
    },
    visualizer() as PluginOption,
  ],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: /^pinia$/, replacement: 'pinia/dist/pinia.mjs' },
    ]
  },
  optimizeDeps: {
    include:[
      'vue-router'
    ],
    exclude: [
      'virtual:pwa-register'
    ]
  }
})
