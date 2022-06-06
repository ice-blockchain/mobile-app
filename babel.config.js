module.exports = api => {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
    plugins: [
      '@babel/plugin-transform-runtime',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@components': './src/components',
            '@api': './src/api',
            '@services': './src/services',
            '@navigation': './src/navigation',
            '@images': './src/assets/images',
            '@svg': './src/assets/svg',
            '@constants': './src/constants',
            '@screens': './src/screens',
            '@store': './src/store',
            '@translations': './src/translations',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            'mock-data': './test/mock-data',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
    exclude: ['**/*.png', '**/*.jpg', '**/*.gif'],
  };
};
