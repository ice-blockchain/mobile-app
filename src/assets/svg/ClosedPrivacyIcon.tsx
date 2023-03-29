// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ClosedPrivacyIcon = ({
  color = COLORS.primaryDark,
  width = rem(24),
  height = rem(24),
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox={'0 0 24 24'}
    fill="none"
    {...props}>
    <Path
      d="M9.88 9.88a3 3 0 1 0 4.24 4.24m-3.39-9.04c.421-.052.845-.08 1.27-.08 7 0 10 7 10 7a13.163 13.163 0 0 1-1.67 2.68"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M3.5 3.5 20 20"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
