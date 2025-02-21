import { URL, fileURLToPath } from 'node:url';
import { type PluginOption, defineConfig } from 'vite';
import VueRouter from 'unplugin-vue-router/vite';
import Vue from '@vitejs/plugin-vue';
import Vuetify from 'vite-plugin-vuetify';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import VueDevTools from 'vite-plugin-vue-devtools';
import { setDefaultResultOrder } from 'dns';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'upath';
import fs from 'fs';
import { execSync } from 'child_process';

setDefaultResultOrder('verbatim');

export default defineConfig(({ mode }) => {

  const buildDate = new Date().toISOString();
  const commitSha = execSync('git rev-parse --short HEAD').toString().split('\n')[0];
  const commitDate = execSync('git log -1 --format=%cI').toString().split('\n')[0];

  const allRoutes: any[] = [];
  const locales = ['en', 'fr'];

  return {
    plugins: [
      VueRouter({
        routesFolder: [
          'src/pages',
          '../../node_modules/@amilochau/core-vue3/src/pages',
          '../../node_modules/@amilochau/core-vue3-auth/src/pages',
        ],
        extendRoute: (route) => {
          allRoutes.push(route);
        },
      }),
      Vue({
        features: {
          optionsAPI: false,
        },
      }),
      Vuetify(),
      VueI18n({
        fullInstall: false,
      }),
      VitePWA({
        srcDir: 'src',
        filename: 'service-worker.ts',
        strategies: 'injectManifest',
        injectManifest: {
          globPatterns: ['**/*.{js,css,html,ico,png}'],
          maximumFileSizeToCacheInBytes: 24 * 1024 ** 2, // 24 MB - To avoid precaching too large files
        },
        includeManifestIcons: false,
        manifest: {
          name: 'core-vue3 - Playground Auth',
          description: 'Test @amilochau/core-vue3-auth',
          short_name: 'Playground Auth',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'img/icons/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'img/icons/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'img/icons/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'img/icons/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      }),
      {
        name: 'amilochau:build-options',
        transformIndexHtml (html) {
          return html.replace(
            /window.buildData = null;/,
            `window.buildData = { buildDate: "${buildDate}", commitSha: "${commitSha}", commitDate: "${commitDate}" };`,
          );
        },
      },
      {
        name: 'amilochau:fallback',
        enforce: 'post',
        transformIndexHtml (html) {
          fs.mkdirSync('dist', { recursive: true });
          fs.writeFileSync(path.join('dist/_fallback.html'), html);
        },
      },
      VueDevTools(),
      visualizer() as PluginOption,
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      include: [
        'vue-router',
      ],
      exclude: [
        'virtual:pwa-register',
        'aws-amplify',
      ],
    },
  };
});
