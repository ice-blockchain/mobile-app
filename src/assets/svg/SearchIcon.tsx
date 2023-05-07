// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

type Props = SvgProps & {
  strokeWidth?: number;
};

export const SearchIcon = (props: Props) => (
  <Svg width={rem(24)} height={rem(24)} fill="none" {...props}>
    <Path
      d="m19.94 20-4.14-4.193M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
      stroke={props.color ?? COLORS.secondary}
      strokeWidth={props.strokeWidth ?? 1.5}
      strokeLinecap="round"
    />
  </Svg>
);
