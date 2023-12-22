module.exports = {
  root: true,
  extends: '@react-native',
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
        'react-native/no-unused-styles': 'error',
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
              {
                name: '@constants/fonts',
                message: 'Please use font util from @utils/styles',
              },
              {
                name: 'dayjs',
                message: 'Please use dayjs from @services/dayjs',
              },
              {
                name: 'lottie-react-native',
                message: 'Please use custom wrapper from @component/LottieView',
              },
              {
                name: 'react-string-replace',
                message: 'Please use replaceString from @translations/i18n',
              },
              {
                name: 'react-native-safe-area-context',
                importNames: ['useSafeAreaFrame', 'useSafeAreaInsets'],
                message:
                  'Please use useSafeAreaFrame from @hooks/useSafeAreaFrame or useSafeAreaInsets from @hooks/useSafeAreaInsets',
              },
              {
                name: 'react-native-share',
                message: 'Please use custom wrapper from @services/share',
              },
              {
                name: '@gorhom/bottom-sheet',
                message:
                  'Please use custom wrapper from @component/BottomSheet',
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
