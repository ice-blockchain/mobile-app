module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'detox', 'simple-import-sort'],
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx',
        '*.e2e.js',
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/tools.js',
      ],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'react-hooks/exhaustive-deps': 'error',
        'no-shadow': 'off',
        'no-undef': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['..*', './../*'],
                message: 'Please use absolute import with @ instead',
              },
            ],
            paths: [
              {
                name: 'i18n-js',
                message: 'Please use custom wrapper from @translations/i18n',
              },
              {
                name: 'react-native-config',
                message: 'Please use custom wrapper from @constants/env',
              },
            ],
          },
        ],
        'no-restricted-modules': [
          'error',
          {
            patterns: ['src/assets/images/*', 'src/assets/lottie/*'],
          },
        ],
      },
      env: {
        'detox/detox': true,
        jest: true,
        'jest/globals': true,
      },
    },
  ],
};
