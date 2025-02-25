import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "./src/index",
    { input: './src/components/', outDir: './dist/components' },
    "./src/composition",
    { input: './src/pages/', outDir: './dist/pages' },
    "./src/types"
  ],
  declaration: true,
  sourcemap: true,
  externals: [
    "@aws-amplify/auth",
    "@intlify/core-base",
    "@intlify/message-compiler",
    "@intlify/shared",
    "@mdi/js",
    "@vue/devtools-api",
    "pinia",
    "vue",
    "vue-i18n",
    "vue-router"
  ]
});
