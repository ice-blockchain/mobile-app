module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },

  /**
   * No longer supported by react-native cli.
   * Need for `react-native-asset`
   * Run `npx react-native-asset` to link fonts
   *  */
  assets: ['./src/assets/fonts/'],
};
