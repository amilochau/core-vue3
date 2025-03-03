import { defineConfig } from 'vite';
import path from 'path';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    vueI18n(),
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        index2: path.resolve(__dirname, 'src/index2.ts'),
        components: path.resolve(__dirname, 'src/components/index.ts'),
        styles: path.resolve(__dirname, 'src/styles/main.scss'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        "@mdi/js",
        "@unhead/vue",
        "@vueuse/core",
        "deepmerge",
        'pinia',
        'vue',
        'vue-i18n',
        'vue-router',
        'vuetify',
        "vuetify/locale",
        "vuetify/iconsets/mdi-svg",
        "vuetify/components",
      ],
    },
  },
});
