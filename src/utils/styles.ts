// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
// eslint-disable-next-line no-restricted-imports
import {FONT_WEIGHTS, FontFamily, FONTS} from '@constants/fonts';
import {isRTL} from '@translations/i18n';
import {TextStyle} from 'react-native';
import {rem} from 'rn-units';

export const font = (
  fontSize: number,
  lineHeight?: number | null,
  fontWeight: keyof typeof FONT_WEIGHTS = 'regular',
  color: keyof typeof COLORS = 'white',
  textAlign: TextStyle['textAlign'] = 'left',
  fontFamily: FontFamily = 'primary',
) => {
  return {
    fontSize: rem(fontSize),
    lineHeight: lineHeight != null ? rem(lineHeight) : undefined,
    fontFamily: FONTS[fontFamily][FONT_WEIGHTS[fontWeight]],
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
