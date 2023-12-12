// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const DownloadIcon = ({color = COLORS.white, ...props}: SvgProps) => {
  return (
    <Svg
      width={rem(18)}
      height={rem(18)}
      viewBox="0 0 18 18"
      fill="none"
      {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.75 11.25c0 2.121 0 3.182.659 3.841.659.659 1.72.659 3.841.659h4.5c2.121 0 3.182 0 3.841-.659.659-.659.659-1.72.659-3.841M9.125 2.25V12m0 0L12.5 8.719M9.125 12 5.75 8.719"
      />
    </Svg>
  );
};
