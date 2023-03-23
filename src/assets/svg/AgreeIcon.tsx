// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const AgreeIcon = ({
  width = rem(23),
  height = rem(22),
  color = COLORS.white,
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox={'0 0 23 22'}
    {...props}>
    <Path
      d="M11.5 20.167c.733 0 1.466-.092 2.108-.275-.367-.459-.733-1.009-.917-1.65-.366.091-.825.091-1.191.091-4.034 0-7.334-3.3-7.334-7.333s3.3-7.333 7.334-7.333c.733 0 1.375.091 2.016.275l1.467-1.467c-1.1-.367-2.292-.642-3.483-.642-5.042 0-9.167 4.125-9.167 9.167s4.125 9.167 9.167 9.167Zm-5.042-9.625 1.283-1.284 2.842 2.842 7.883-7.883L19.75 5.5l-9.167 9.167-4.125-4.125Zm11.458 2.291-1.155 2.521L14.25 16.5l2.511 1.155 1.155 2.512 1.146-2.512 2.521-1.155-2.52-1.146-1.147-2.52Z"
      fill={color}
    />
  </Svg>
);
