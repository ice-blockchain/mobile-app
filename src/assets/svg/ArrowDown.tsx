// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ArrowDown = ({
  color = COLORS.attention,
  width = rem(11),
  height = rem(16),
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 11 16" fill="none" {...props}>
    <Path
      d="M6.66921 12.5822V0.997803C6.66921 0.444678 6.22234 -0.00219727 5.66921 -0.00219727C5.11609 -0.00219727 4.66921 0.444678 4.66921 0.997803V12.5822L2.37546 10.2916C1.98484 9.90093 1.35046 9.90093 0.959839 10.2916C0.569214 10.6822 0.569214 11.3166 0.959839 11.7072L4.95984 15.7072C5.35046 16.0978 5.98484 16.0978 6.37546 15.7072L10.3755 11.7072C10.7661 11.3166 10.7661 10.6822 10.3755 10.2916C9.98484 9.90093 9.35046 9.90093 8.95984 10.2916L6.66921 12.5822Z"
      fill={color}
    />
  </Svg>
);
