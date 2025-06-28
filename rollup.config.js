/**
 * Rollup configuration for bundling JavaScript modules
 */
// Using CommonJS to avoid module issues
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');

module.exports = {
  input: 'assets/js/main.js',
  output: {
    file: 'assets/js/bundle.js',
    format: 'iife',
    name: 'portfolio',
    sourcemap: true,
    plugins: [
      terser({
        compress: {
          drop_console: true,
        },
      }),
    ],
  },
  plugins: [
    nodeResolve({
      browser: true,
    }),
  ],
  watch: {
    include: 'assets/js/**',
    clearScreen: false,
  },
};