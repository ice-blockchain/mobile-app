// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SpeakerphoneIcon = ({
  color = COLORS.white,
  ...props
}: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox={'0 0 24 24'}
    fill="none"
    {...props}>
    <Path
      stroke={color}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={1.5}
      d={
        'M11 5.882V19.24a1.76 1.76 0 0 1-3.417.592l-2.147-6.15m0 0A3.999 3.999 0 0 1 7 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.066-3-9.168-3H7c-.537 0-1.069-.108-1.564-.318ZM18 13a3 3 0 0 0 0-6'
      }
    />
  </Svg>
);
