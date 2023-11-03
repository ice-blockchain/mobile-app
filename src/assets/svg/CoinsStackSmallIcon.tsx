// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const CoinsStackSmallIcon = ({
  color = COLORS.white,
  width = rem(28),
  height = rem(28),
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 28 28" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M24.5 9.333c0-1.933-3.656-3.5-8.167-3.5-4.51 0-8.166 1.567-8.166 3.5m16.333 0V14c0 1.19-1.384 2.24-3.5 2.872-1.323.397-2.932.628-4.667.628-1.734 0-3.343-.233-4.666-.628-2.115-.632-3.5-1.682-3.5-2.872V9.333m16.333 0c0 1.19-1.384 2.24-3.5 2.872-1.323.397-2.932.628-4.667.628-1.734 0-3.343-.232-4.666-.628-2.115-.632-3.5-1.682-3.5-2.872M3.5 14v4.666c0 1.19 1.385 2.24 3.5 2.873 1.323.396 2.932.627 4.667.627 1.735 0 3.343-.232 4.666-.627 2.116-.633 3.5-1.683 3.5-2.873V17.5M3.5 14c0-1.397 1.907-2.602 4.667-3.163M3.5 14c0 1.19 1.385 2.24 3.5 2.872 1.323.397 2.932.628 4.667.628.81 0 1.593-.05 2.333-.145"
    />
  </Svg>
);
