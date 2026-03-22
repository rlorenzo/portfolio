import { defineConfig } from "rolldown";

export default defineConfig({
  input: "assets/js/main.js",
  output: {
    file: "assets/js/bundle.js",
    format: "iife",
    name: "portfolio",
    sourcemap: true,
    minify: true,
  },
  resolve: {
    conditionNames: ["browser"],
  },
});
