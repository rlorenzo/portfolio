module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
    process.env.NODE_ENV === 'production' &&
      require('cssnano')({
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
            minifyFontValues: false,
            normalizeWhitespace: false,
          },
        ],
      }),
  ].filter(Boolean),
};
