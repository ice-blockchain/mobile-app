// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const QuestionIcon = ({color = COLORS.white, ...props}: SvgProps) => (
  <Svg width={rem(24)} height={rem(24)} fill="none" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.241}
      d="M12.001 20a8.001 8.001 0 1 0 0-16.002 8.001 8.001 0 0 0 0 16.002Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.241}
      d="M10.133 10.202a1.861 1.861 0 1 1 1.861 1.861v1.241"
    />
    <Path
      fill={color}
      d="M11.954 15.165a.93.93 0 1 0 .93.931.943.943 0 0 0-.93-.93Z"
    />
  </Svg>
);
