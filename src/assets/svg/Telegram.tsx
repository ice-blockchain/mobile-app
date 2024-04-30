// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const TelegramIcon = ({color = COLORS.white, ...props}: SvgProps) => {
  return (
    <Svg
      width={rem(16)}
      height={rem(14)}
      viewBox="0 0 16 14"
      fill="none"
      {...props}>
      <Path
        d="M14.4987 0.627215L1.2012 5.75496C0.293699 6.11946 0.298949 6.62571 1.0347 6.85146L4.4487 7.91646L12.3477 2.93271C12.7212 2.70546 13.0624 2.82771 12.7819 3.07671L6.3822 8.85246H6.3807L6.3822 8.85321L6.1467 12.3722C6.4917 12.3722 6.64395 12.214 6.83745 12.0272L8.4957 10.4147L11.9449 12.9625C12.5809 13.3127 13.0377 13.1327 13.1959 12.3737L15.4602 1.70271C15.6919 0.773465 15.1054 0.352715 14.4987 0.627215Z"
        fill={color}
      />
    </Svg>
  );
};
