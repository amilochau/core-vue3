import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
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
        components: path.resolve(__dirname, 'src/components/index.ts'),
        composition: path.resolve(__dirname, 'src/composition/index.ts'),
        stores: path.resolve(__dirname, 'src/stores/index.ts'),
        utils: path.resolve(__dirname, 'src/utils/index.ts'),
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
      ]
    }
  }
});
