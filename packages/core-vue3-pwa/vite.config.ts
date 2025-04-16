import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import vuetify from 'vite-plugin-vuetify';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    vueI18n(),
    vuetify(),
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: {
        index: 'src/index.ts',
        components: 'src/components/index.ts',
        composition: 'src/composition/index.ts',
        stores: 'src/stores/index.ts',
        types: 'src/types/index.ts',
        utils: 'src/utils/index.ts',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        '@mdi/js',
        '@unhead/vue',
        '@vueuse/core',
        'deepmerge',
        'pinia',
        'vue',
        'vue-i18n',
        'vue-router',
        'vuetify',
        'vuetify/locale',
        'vuetify/iconsets/mdi-svg',
        'vuetify/components',
        'virtual:pwa-register'
      ],
    },
  },
});
