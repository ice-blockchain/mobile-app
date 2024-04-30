// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SonarIcon = ({color = COLORS.white, ...props}: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox={'0 0 24 24'}
    fill="none"
    {...props}>
    <Path
      d="M5.636 18.365a9 9 0 0 1 0-12.728m12.728 0a9 9 0 0 1 0 12.728m-9.9-2.83a5 5 0 0 1 0-7.07m7.072 0a5 5 0 0 1 0 7.07M13 12.002a1 1 0 1 1-2 0 1 1 0 0 1 2 0v0Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
