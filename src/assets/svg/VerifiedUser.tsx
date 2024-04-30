// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const VerifiedUserIcon = ({
  color = COLORS.white,
  ...props
}: SvgProps) => {
  return (
    <Svg
      width={rem(16)}
      height={rem(20)}
      viewBox="0 0 16 20"
      fill="none"
      {...props}>
      <Path
        d="M8 0.915588L0.5 4.24892V9.24892C0.5 13.8739 3.7 18.1989 8 19.2489C12.3 18.1989 15.5 13.8739 15.5 9.24892V4.24892L8 0.915588ZM13.8333 9.24892C13.8333 13.0156 11.35 16.4906 8 17.5239C4.65 16.4906 2.16667 13.0156 2.16667 9.24892V5.33225L8 2.74059L13.8333 5.33225V9.24892ZM4.175 9.74059L3 10.9156L6.33333 14.2489L13 7.58225L11.825 6.39892L6.33333 11.8906L4.175 9.74059Z"
        fill={color}
      />
    </Svg>
  );
};
