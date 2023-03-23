// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ArrowUp = ({
  color = COLORS.shamrock,
  width = rem(11),
  height = rem(16),
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 11 16" fill="none" {...props}>
    <Path
      d="M6.66934 3.41538V14.9998C6.66934 15.5529 6.22246 15.9998 5.66934 15.9998C5.11621 15.9998 4.66934 15.5529 4.66934 14.9998V3.41538L2.37559 5.70601C1.98496 6.09663 1.35059 6.09663 0.959961 5.70601C0.569336 5.31538 0.569336 4.681 0.959961 4.29038L4.95996 0.290378C5.35059 -0.100246 5.98496 -0.100246 6.37559 0.290378L10.3756 4.29038C10.7662 4.681 10.7662 5.31538 10.3756 5.70601C9.98496 6.09663 9.35058 6.09663 8.95996 5.70601L6.66934 3.41538Z"
      fill={color}
    />
  </Svg>
);
