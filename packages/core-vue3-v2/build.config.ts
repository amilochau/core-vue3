import { defineBuildConfig } from "unbuild";
import * as sass from 'sass';
import fs from 'fs';

export default defineBuildConfig({
  entries: [
    // Bundling
    "./src/index",
    { input: './src/components/', outDir: './dist/components' },
    "./src/composition",
    "./src/stores",
    { input: './src/styles/', outDir: './dist' },
    "./src/types",
    "./src/utils"
  ],
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
  /**/
  hooks: {
    'mkdist:done': () => {
      const compiledSass = sass.compile('./src/styles/index.scss', { style: 'compressed' });

      fs.writeFileSync(
        'dist/index.css',
        compiledSass.css,
        { encoding: 'utf-8' },
      )
    }
  }
  /**/
});
