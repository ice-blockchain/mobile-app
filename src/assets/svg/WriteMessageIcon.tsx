// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const WriteMessageIcon = (props: SvgProps) => (
  <Svg
    width={rem(19)}
    height={rem(19)}
    viewBox="0 0 19 19"
    fill="none"
    {...props}>
    <Path
      d="M13.474 3.40795L15.592 5.52495M14.836 1.54295L9.109 7.26995C8.81309 7.56545 8.61128 7.94193 8.529 8.35195L8 10.9999L10.648 10.4699C11.058 10.3879 11.434 10.1869 11.73 9.89095L17.457 4.16395C17.6291 3.99185 17.7656 3.78754 17.8588 3.56269C17.9519 3.33783 17.9998 3.09683 17.9998 2.85345C17.9998 2.61007 17.9519 2.36907 17.8588 2.14421C17.7656 1.91936 17.6291 1.71505 17.457 1.54295C17.2849 1.37085 17.0806 1.23434 16.8557 1.1412C16.6309 1.04806 16.3899 1.00012 16.1465 1.00012C15.9031 1.00012 15.6621 1.04806 15.4373 1.1412C15.2124 1.23434 15.0081 1.37085 14.836 1.54295V1.54295Z"
      stroke={props.color ?? COLORS.primaryDark}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 13V16C16 16.5304 15.7893 17.0391 15.4142 17.4142C15.0391 17.7893 14.5304 18 14 18H3C2.46957 18 1.96086 17.7893 1.58579 17.4142C1.21071 17.0391 1 16.5304 1 16V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H6"
      stroke={props.color ?? COLORS.primaryDark}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
