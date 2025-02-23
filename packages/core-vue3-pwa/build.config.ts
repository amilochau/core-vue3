import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "./src/index",
    "./src/utils",
    "./src/stores"
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
