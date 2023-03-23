// source: https://github.com/WoodyWoodsta/react-native-slider/blob/master/index.d.ts

declare module 'cldr-compact-number' {
  type CompactFormat = (
    input: number,
    lang: 'en',
    localeData: null,
    options: {
      significantDigits?: number;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
      financialFormat?: boolean;
      threshold?: number;
      long?: boolean;
    },
  ) => string;

  const compactFormat: CompactFormat;

  export default compactFormat;
}
