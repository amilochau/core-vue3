import { defineConfig } from 'vite';
import path from 'path'

export default defineConfig(() => {

  return {
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'src/index.ts'),
        },
        external: [
          'vue',
        ],
        output: {
          globals: {
            vue: 'Vue',
          }
        }
      }
    }
  };
});
