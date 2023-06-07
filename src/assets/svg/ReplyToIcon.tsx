// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ReplyToIcon = (props: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    fill="none"
    viewBox="0 0 20 20"
    {...props}>
    <Path
      d="M10.3333 8.07143C5.25397 8.07143 3.98413 12.5688 3.98413 14.8175C5.30688 13.8915 8.42858 12.1984 10.3333 12.8333L10.7302 16.4048C13.1111 14.6852 17.873 11.0873 17.873 10.4524C17.5556 9.5 12.9788 6.0873 10.7302 4.5L10.3333 8.07143Z"
      stroke={props.color ?? COLORS.primaryDark}
      strokeWidth={props.strokeWidth ?? 1.5}
      strokeLinejoin={'round'}
    />
  </Svg>
);
