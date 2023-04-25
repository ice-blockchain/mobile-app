// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ShareIcon = ({color = COLORS.primaryDark, ...props}: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M17.35 3.5a2.65 2.65 0 1 0 0 5.3 2.65 2.65 0 0 0 0-5.3ZM13 6.15a4.35 4.35 0 1 1 .916 2.671l-3.388 2.114a4.35 4.35 0 0 1 0 2.431l3.388 2.114a4.35 4.35 0 1 1-.764 1.527l-3.413-2.129a4.35 4.35 0 1 1 0-5.455l3.413-2.128A4.358 4.358 0 0 1 13 6.15ZM6.35 9.5a2.65 2.65 0 1 0 0 5.3 2.65 2.65 0 0 0 0-5.3Zm11 6a2.65 2.65 0 1 0 0 5.3 2.65 2.65 0 0 0 0-5.3Z"
      clipRule="evenodd"
    />
  </Svg>
);
