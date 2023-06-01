// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ReportIcon = (props: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    fill="none"
    viewBox="0 0 20 20"
    {...props}>
    <Path
      d="M10 5.83331V10.8333"
      stroke={props.color ?? COLORS.primaryDark}
      strokeWidth={props.strokeWidth ?? 1.5}
      strokeLinejoin={'round'}
    />
    <Circle
      cx={10.0001}
      cy={13.3333}
      r={0.833333}
      fill={props.color ?? COLORS.primaryDark}
    />
    <Path
      d="M6.5359 3.16845C8.2265 2.16727 9.0718 1.66669 10 1.66669C10.9282 1.66669 11.7735 2.16727 13.4641 3.16845L14.0359 3.50707C15.7265 4.50824 16.5718 5.00883 17.0359 5.83335C17.5 6.65788 17.5 7.65905 17.5 9.6614V10.3386C17.5 12.341 17.5 13.3422 17.0359 14.1667C16.5718 14.9912 15.7265 15.4918 14.0359 16.493L13.4641 16.8316C11.7735 17.8328 10.9282 18.3334 10 18.3334C9.0718 18.3334 8.2265 17.8328 6.5359 16.8316L5.9641 16.493C4.2735 15.4918 3.4282 14.9912 2.9641 14.1667C2.5 13.3422 2.5 12.341 2.5 10.3386V9.6614C2.5 7.65905 2.5 6.65788 2.9641 5.83335C3.4282 5.00883 4.2735 4.50824 5.9641 3.50707L6.5359 3.16845Z"
      stroke={props.color ?? COLORS.primaryDark}
      strokeWidth={props.strokeWidth ?? 1.5}
    />
  </Svg>
);
