// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const PaperIcon = ({color = COLORS.white, ...props}: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    viewBox="0 0 20 20"
    fill="none"
    {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.436 5.208h2.5m-2.5 4.375h6.806m-6.806 2.5h6.806m-6.806 2.5h2.5M5 18.125h10a1.25 1.25 0 0 0 1.25-1.25V3.125A1.25 1.25 0 0 0 15 1.875H5a1.25 1.25 0 0 0-1.25 1.25v13.75A1.25 1.25 0 0 0 5 18.125Z"
    />
  </Svg>
);
