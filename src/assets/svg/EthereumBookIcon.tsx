// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const EthereumBookIcon = ({
  color = COLORS.secondary,
  ...props
}: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 8h3m-3 4h3m-3 4h3M19 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"
    />
    <Path
      fill={color}
      d="m12 7.5-2.5 4.61 2.5 1.646 2.5-1.646L12 7.5Zm-2.5 5.159L12 16.5l2.5-3.841-2.5 1.646-2.5-1.646Z"
    />
  </Svg>
);
