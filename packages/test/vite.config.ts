import { defineConfig } from 'vite';
import path from 'path'
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
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
        'vue',
      ]
    }
  },
});
