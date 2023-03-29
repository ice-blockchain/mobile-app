// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const OpenedPrivacyIcon = ({
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
      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
