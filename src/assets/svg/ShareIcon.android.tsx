// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ShareIcon = ({color = COLORS.primaryDark, ...props}: SvgProps) => (
  <Svg width={rem(24)} height={rem(24)} fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M15.5 3.85a2.65 2.65 0 1 0 0 5.3 2.65 2.65 0 0 0 0-5.3ZM11.15 6.5a4.35 4.35 0 1 1 .916 2.67l-3.388 2.114a4.351 4.351 0 0 1 0 2.432l3.388 2.113a4.35 4.35 0 1 1-.764 1.527l-3.413-2.129a4.35 4.35 0 1 1 0-5.455l3.413-2.128A4.358 4.358 0 0 1 11.15 6.5ZM4.5 9.85a2.65 2.65 0 1 0 0 5.3 2.65 2.65 0 0 0 0-5.3Zm11 6a2.65 2.65 0 1 0 0 5.3 2.65 2.65 0 0 0 0-5.3Z"
      clipRule="evenodd"
    />
  </Svg>
);
