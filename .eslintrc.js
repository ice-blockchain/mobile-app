module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'detox'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.e2e.js'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'react-hooks/exhaustive-deps': 'error',
        'no-shadow': 'off',
        'no-undef': 'off',
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
                message: 'Please use custom wrapper from @utils/i18n',
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
            patterns: ['assets/images/*'],
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
