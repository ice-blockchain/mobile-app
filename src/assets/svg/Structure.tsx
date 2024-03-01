// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const StructureIcon = ({
  color = COLORS.primaryLight,
  ...props
}: SvgProps) => (
  <Svg width={rem(24)} height={rem(24)} fill="none" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M8.9 5.7a2.7 2.7 0 0 1-2.7 2.7m2.7-2.7a2.7 2.7 0 1 0-2.7 2.7m2.7-2.7h7.2M6.2 8.4v7.2m12.6-7.2a2.7 2.7 0 1 0-2.7-2.7m2.7 2.7a2.7 2.7 0 0 1-2.7-2.7m2.7 2.7v7.2m-9.9 2.7a2.7 2.7 0 1 1-2.7-2.7m2.7 2.7a2.7 2.7 0 0 0-2.7-2.7m2.7 2.7h7.2m0 0a2.7 2.7 0 1 0 2.7-2.7m-2.7 2.7a2.7 2.7 0 0 1 2.7-2.7"
    />
  </Svg>
);
