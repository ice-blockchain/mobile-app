// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
// eslint-disable-next-line no-restricted-imports
import {FontFamily, FONTS, FontWight} from '@constants/fonts';
import {isRTL} from '@translations/i18n';
import {rem} from 'rn-units';

type TextAlignType =
  | 'center'
  | 'auto'
  | 'left'
  | 'right'
  | 'justify'
  | undefined;

export const font = (
  fontSize: number,
  lineHeight?: number | null,
  fontWeight: FontWight = 'regular',
  color: keyof typeof COLORS = 'white',
  textAlign: TextAlignType = 'left',
  fontFamily: FontFamily = 'primary',
) => {
  return {
    fontSize: rem(fontSize),
    lineHeight: lineHeight != null ? rem(lineHeight) : undefined,
    fontFamily: FONTS[fontFamily][fontWeight],
    color: COLORS[color],
    textAlign,
  };
};

export const mirrorTransform = (isReverted?: boolean) => {
  if (isReverted) {
    return {
      transform: [{scaleX: isRTL ? 1 : -1}],
    };
  }
  return {
    transform: [{scaleX: isRTL ? -1 : 1}],
  };
};
