import { defineConfig } from 'vite';
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
        index: 'src/index.ts',
        composition: 'src/composition/index.ts',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        '@aws-amplify/auth',
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
      ],
    },
  },
});
