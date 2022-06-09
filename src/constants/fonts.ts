// SPDX-License-Identifier: BUSL-1.1

type Weight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

const FONTS = {
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

const WEIGHTS: Record<string, Weight> = {
  thin: '100',
  ultraThin: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

export {FONTS, WEIGHTS};
