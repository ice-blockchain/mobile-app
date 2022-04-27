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
    black: 'Lato-Black',
    blackItalic: 'Lato-BlackItalic',
    bold: 'Lato-Bold',
    boldItalic: 'Lato-BoldItalic',
    italic: 'Lato-Italic',
    light: 'Lato-Light',
    lightItalic: 'Lato-LightItalic',
    regular: 'Lato-Regular',
    thin: 'Lato-Thin',
    thinItalic: 'Lato-ThinItalic',
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
