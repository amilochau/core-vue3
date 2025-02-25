import { defineBuildConfig } from "unbuild";
import * as sass from 'sass';
import fs from 'fs';

export default defineBuildConfig({
  entries: [
    "./src/index",
    //{ builder: 'mkdist', input: './src/components', pattern: ['**/*.vue'], loaders: ['vue'] },
    //{ builder: 'mkdist', input: './src/components' },
    { input: './src/components' },
    "./src/composition",
    "./src/stores",
    { input: './src/styles/', outDir: './dist' },
    "./src/types",
    "./src/utils"
  ],
/*
  entries: [
    './src/index',             // Main entry
    './src/components',  // Components submodule
    './src/composition',       // Composition submodule
    './src/stores',            // Stores submodule
    './src/types',             // Types submodule
    './src/utils'              // Utils submodule
  ],
  */
  declaration: true,
  sourcemap: true,
  externals: [
    "@mdi/js",
    "@unhead/vue",
    "@vueuse/core",
    "@vueuse/shared",
    "deepmerge",
    "pinia",
    "vue",
    "vue-demi",
    "vue-i18n",
    "vue-router",
    "vuetify",
    "vuetify/locale",
    "vuetify/iconsets/mdi-svg",
    "vuetify/components",
  ],
  hooks: {
    'mkdist:done': () => {
      const compiledSass = sass.compile('./src/styles/index.scss', { style: 'compressed' });

      fs.writeFileSync(
        'dist/index.css',
        compiledSass.css,
        { encoding: 'utf-8' },
      )

      /*
      const writePkg = (folder: string) => {
        const pkg = {
          name: `@amilochau/core-vue3-v2/${folder}`,
          main: `./index.mjs`,
          types: `./index.d.ts`
        }
        fs.writeFileSync(`dist/${folder}/package.json`, JSON.stringify(pkg, null, 2), { encoding: 'utf-8' })
      }
      writePkg('components')
      */
    }
  }
});
