// SPDX-License-Identifier: ice License 1.0

export type FontWight = keyof typeof FONT_WEIGHTS;

export const FONT_WEIGHTS = {
  hairline: '100',
  thin: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
} as const;

export type FontFamily = 'primary';

export const FONTS: {[font in FontFamily]: {[width in FontWight]: string}} = {
  primary: {
    hairline: 'Lato-Hairline', // 100
    thin: 'Lato-Thin', // 200
    light: 'Lato-Light', // 300
    regular: 'Lato-Regular', // 400
    medium: 'Lato-Medium', // 500
    semibold: 'Lato-Semibold', // 600
    bold: 'Lato-Bold', // 700
    heavy: 'Lato-Heavy', // 800
    black: 'Lato-Black', // 900
  },
};
