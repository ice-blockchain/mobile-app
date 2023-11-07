// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const EthereumIcon = ({color = COLORS.white, ...props}: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <Path
      fill={color}
      d="M12.25 2 6 12.5l6.25 3.75 6.25-3.75L12.25 2ZM6 13.75l6.25 8.75 6.25-8.75-6.25 3.75L6 13.75Z"
    />
  </Svg>
);
