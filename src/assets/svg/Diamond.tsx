// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const DiamondIcon = ({
  color = COLORS.primaryLight,
  ...props
}: SvgProps) => (
  <Svg width={rem(24)} height={rem(24)} fill="none" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.346}
      d="M11.2 3.55 7.448 9.367l4.554 10.999 4.584-11-3.738-5.814M2.032 9.366H21.97m-4.372-5.8H6.404a1.646 1.646 0 0 0-1.307.708l-2.8 3.876a1.615 1.615 0 0 0 .092 1.985l8.397 9.676a1.538 1.538 0 0 0 2.43 0l8.395-9.676a1.615 1.615 0 0 0 .092-1.985l-2.798-3.876a1.646 1.646 0 0 0-1.308-.708Z"
    />
  </Svg>
);
