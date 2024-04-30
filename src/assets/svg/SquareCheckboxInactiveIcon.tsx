// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SquareCheckboxInactiveIcon = ({
  color = COLORS.secondary,
  ...props
}: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.75 4.125a.375.375 0 0 1 .375-.375h15.75a.375.375 0 0 1 .375.375v15.75a.375.375 0 0 1-.375.375H4.125a.375.375 0 0 1-.375-.375V4.125ZM4.125 1.5A2.625 2.625 0 0 0 1.5 4.125v15.75A2.626 2.626 0 0 0 4.125 22.5h15.75a2.625 2.625 0 0 0 2.625-2.625V4.125A2.625 2.625 0 0 0 19.875 1.5H4.125Z"
      fill={color}
    />
  </Svg>
);
