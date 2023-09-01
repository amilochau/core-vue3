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

setDefaultResultOrder('verbatim')

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
      includeAssets: [
        'favicon.ico',
      ],
      //
      injectManifest: {
          globIgnores: ['**/*.html'], // To ignore the generated _fallback.html
          additionalManifestEntries: [
            { url: '/_fallback.html', revision: Date.now().toString(16) }, // To ensure that it is the latest copy of index.html
          ],
          dontCacheBustURLsMatching: /assets\/.+-[A-Za-z0-9]{8}\.(js|css|png)$/, // To reduce bandwidth consumed by precaching with assets uniquely versioned via their URL
          maximumFileSizeToCacheInBytes: 24 * 1024 ** 2, // To avoid precaching too large files
      },
      minify: false, // Only for tests purpuse
      manifest: {
        name: 'core-vue3 - Playground Auth',
        description: 'Test @amilochau/core-vue3-auth',
        short_name: 'Playground Auth',
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
        ]
      },
      //// Nothing else
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png}']
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
    include: [
      "@aws-amplify/auth",
      'vue-router'
    ]
  }
})
