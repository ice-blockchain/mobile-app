// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const PasswordIcon = ({
  color = COLORS.secondary,
  ...props
}: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox={'0 0 24 24'}
    fill="none"
    {...props}>
    <Path
      d="M21 13V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h7"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.879 16.917c.494.304.463 1.043-.045 1.1l-2.567.292-1.151 2.312c-.228.459-.933.234-1.05-.334l-1.255-6.116c-.099-.48.333-.782.75-.525l5.318 3.27Z"
      stroke={color}
      strokeWidth={1.3}
    />
    <Path
      d="m12 11.01.01-.011m3.99.011.01-.011M8 11.01l.01-.011"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
