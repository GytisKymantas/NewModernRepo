module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier'
  ],
  overrides: [],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': (process.platform === 'win32' ? 0 : ['error', 'unix']),
    'no-underscore-dangle': ['off'],
    'no-param-reassign': [2, { 'props': false }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
