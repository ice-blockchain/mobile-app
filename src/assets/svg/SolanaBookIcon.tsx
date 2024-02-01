// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SolanaBookIcon = ({
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
      d="M9.3 13.58a.268.268 0 0 1 .185-.074h6.384c.117 0 .175.135.092.214l-1.26 1.207a.268.268 0 0 1-.186.073H8.131c-.117 0-.175-.135-.092-.214l1.26-1.207ZM9.3 9.073A.275.275 0 0 1 9.485 9h6.384c.117 0 .175.135.092.214l-1.26 1.207a.268.268 0 0 1-.186.073H8.131c-.117 0-.175-.135-.092-.214l1.26-1.207ZM14.7 11.312a.268.268 0 0 0-.185-.073H8.131c-.117 0-.175.134-.092.213l1.26 1.207a.268.268 0 0 0 .186.073h6.384c.117 0 .175-.134.092-.213l-1.26-1.207Z"
    />
  </Svg>
);
