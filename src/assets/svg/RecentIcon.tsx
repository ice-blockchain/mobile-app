// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const RecentIcon = ({
  strokeWidth = 2,
  color = COLORS.primaryLight,
  ...props
}: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    fill="none"
    viewBox="0 0 20 20"
    {...props}>
    <G clipPath={'url(#clip0_15907_79200)'}>
      <Path
        d="M10.0001 18.3333C14.6026 18.3333 18.3334 14.6025 18.3334 9.99999C18.3334 5.39749 14.6026 1.66666 10.0001 1.66666C5.39758 1.66666 1.66675 5.39749 1.66675 9.99999C1.66675 14.6025 5.39758 18.3333 10.0001 18.3333Z"
        strokeLinejoin={'round'}
        strokeWidth={strokeWidth}
        stroke={color}
      />
      <Path
        d="M10.0034 5V10.0042L13.5363 13.5375"
        strokeLinejoin={'round'}
        strokeLinecap={'round'}
        strokeWidth={strokeWidth}
        stroke={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_15907_79200">
        <Rect width="20" height="20" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
