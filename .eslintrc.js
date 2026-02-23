module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'globals': {
    'AOS': 'readonly'
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  },
  'overrides': [
    {
      'files': ['.eslintrc.js', 'playwright.config.js', 'tests/**/*.js'],
      'env': {
        'node': true
      },
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ]
};
