import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "./src/index",
    { input: './src/components/', outDir: './dist/components' },
    "./src/composition",
    "./src/stores",
    "./src/utils"
  ],
  declaration: true,
  sourcemap: true,
  externals: [
    "pinia",
    "virtual:pwa-register",
    "vite-plugin-pwa",
    "vue",
    "vue-router"
  ]
});
