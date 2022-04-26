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
      ['module:react-native-dotenv'],
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
            '@images': './src/images',
            '@svg': './src/svg',
            '@screens': './src/screens',
            '@store': './src/store',
            '@translations': './src/translations',
            '@utils': './src/utils',
            'mock-data': './test/mock-data',
            types: './src/types',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
    exclude: ['**/*.png', '**/*.jpg', '**/*.gif'],
  };
};
