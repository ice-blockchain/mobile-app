module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|react-native-sha256|react-native-device-info)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
