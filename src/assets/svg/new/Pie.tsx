// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const PieIcon = ({color = COLORS.primaryLight, ...props}: SvgProps) => (
  <Svg width={rem(24)} height={rem(24)} fill="none" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M18.4 14.842A7.369 7.369 0 1 1 9.158 5.6"
    />
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="M19.93 10.358a9.081 9.081 0 0 0-6.288-6.288c-1.314-.368-2.442.773-2.442 2.138v5.356c0 .683.554 1.236 1.236 1.236h5.356c1.365 0 2.506-1.127 2.139-2.442Z"
    />
  </Svg>
);
