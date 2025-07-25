module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'airbnb',
        'airbnb-typescript',
        'prettier',
      ],
      rules: {
        'prettier/prettier': 'error',
        'linebreak-style': process.platform === 'win32' ? 0 : ['error', 'unix'],
        'no-underscore-dangle': ['off'],
        'no-param-reassign': [2, { props: false }],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'react/jsx-no-useless-fragment': 'off',
        'react/no-array-index-key': 'warn',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        // Import rules for TypeScript with path mapping
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
        // Disable import/order since prettier-plugin-organize-imports handles it
        'import/order': 'off',
      },
    },
    {
      files: ['*.js', '*.jsx'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'airbnb',
        'prettier',
      ],
      rules: {
        'prettier/prettier': 'error',
        'linebreak-style': process.platform === 'win32' ? 0 : ['error', 'unix'],
        'no-underscore-dangle': ['off'],
        'no-param-reassign': [2, { props: false }],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'react/jsx-no-useless-fragment': 'off',
        'react/no-array-index-key': 'warn',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
      },
    },
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
