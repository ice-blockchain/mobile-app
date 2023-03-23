// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Line, Path, Rect, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ContactsIcon = ({color = COLORS.white, ...props}: SvgProps) => (
  <Svg
    width={rem(16)}
    height={rem(16)}
    viewBox="0 0 16 16"
    fill="none"
    {...props}>
    <Path
      d="M9.83341 6.66683C9.83341 7.67935 9.0126 8.50016 8.00008 8.50016C6.98756 8.50016 6.16675 7.67935 6.16675 6.66683C6.16675 5.65431 6.98756 4.8335 8.00008 4.8335C9.0126 4.8335 9.83341 5.65431 9.83341 6.66683Z"
      stroke={color}
    />
    <Path
      d="M5 13V12.0002C5 11.3335 5.66667 10.3335 7 10.3335C8.33333 10.3335 8.88889 10.3335 9 10.3335C10.3333 10.3335 11 11.3335 11 12.0002C11 13.0668 11 12.7778 11 13"
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Rect
      x="1.83325"
      y="2.8335"
      width="12.3333"
      height="12.3333"
      rx="2.16667"
      stroke={color}
    />
    <Path d="M4.5 2.33333V1" stroke={color} />
    <Line x1="11.5" y1="2.3335" x2="11.5" y2="1.00016" stroke={color} />
  </Svg>
);
