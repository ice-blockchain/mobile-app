// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
// eslint-disable-next-line no-restricted-imports
import {FontFamily, FONTS, FontWight} from '@constants/fonts';
import {rem} from 'rn-units';

export const font = (
  fontSize: number,
  lineHeight?: number | null,
  fontWeight: FontWight = 'regular',
  color: keyof typeof COLORS = 'white',
  fontFamily: FontFamily = 'primary',
) => {
  return {
    fontSize: rem(fontSize),
    lineHeight: lineHeight != null ? rem(lineHeight) : undefined,
    fontFamily: FONTS[fontFamily][fontWeight],
    color: COLORS[color],
  };
};
