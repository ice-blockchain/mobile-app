// SPDX-License-Identifier: ice License 1.0

type ValueOf<T> = T[keyof T];

export const FONT_WEIGHTS = {
  hairline: '100',
  '100': '100',

  thin: '200',
  '200': '200',

  light: '300',
  '300': '300',

  regular: '400',
  '400': '400',

  medium: '500',
  '500': '500',

  semibold: '600',
  '600': '600',

  bold: '700',
  '700': '700',

  heavy: '800',
  '800': '800',

  black: '900',
  '900': '900',
} as const;

export type FontFamily = 'primary';

export const FONTS: {
  [font in FontFamily]: {
    [weight in ValueOf<typeof FONT_WEIGHTS>]: string;
  };
} = {
  primary: {
    '100': 'Lato-Hairline',
    '200': 'Lato-Thin',
    '300': 'Lato-Light',
    '400': 'Lato-Regular',
    '500': 'Lato-Medium',
    '600': 'Lato-Semibold',
    '700': 'Lato-Bold',
    '800': 'Lato-Heavy',
    '900': 'Lato-Black',
  },
};
