// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Circle, Path, Svg, SvgProps} from 'react-native-svg';

export const InfoIcon = ({
  color = COLORS.primaryDark,
  secondaryColor = COLORS.white,
  ...props
}: SvgProps & {secondaryColor?: string}) => {
  return (
    <Svg width="11" height="11" viewBox="0 0 11 11" fill="none" {...props}>
      <Circle
        cx="5.5"
        cy="5.5"
        r="5.1"
        fill={color}
        stroke={color}
        strokeWidth="0.8"
      />
      <Path
        d="M6.012 4.19678V8.30078H5.02V4.19678H6.012ZM6.148 3.00078C6.148 3.08611 6.13067 3.16611 6.096 3.24078C6.06133 3.31545 6.01467 3.38078 5.956 3.43678C5.9 3.49278 5.83333 3.53811 5.756 3.57278C5.67867 3.60478 5.596 3.62078 5.508 3.62078C5.42267 3.62078 5.34133 3.60478 5.264 3.57278C5.18933 3.53811 5.124 3.49278 5.068 3.43678C5.012 3.38078 4.96667 3.31545 4.932 3.24078C4.9 3.16611 4.884 3.08611 4.884 3.00078C4.884 2.91278 4.9 2.83011 4.932 2.75278C4.96667 2.67545 5.012 2.60878 5.068 2.55278C5.124 2.49678 5.18933 2.45278 5.264 2.42078C5.34133 2.38611 5.42267 2.36878 5.508 2.36878C5.596 2.36878 5.67867 2.38611 5.756 2.42078C5.83333 2.45278 5.9 2.49678 5.956 2.55278C6.01467 2.60878 6.06133 2.67545 6.096 2.75278C6.13067 2.83011 6.148 2.91278 6.148 3.00078Z"
        fill={secondaryColor}
      />
    </Svg>
  );
};
