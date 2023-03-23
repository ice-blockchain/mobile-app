// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const RoundCheckboxActiveIcon = ({
  color = COLORS.shamrock,
  ...props
}: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <G clipPath="url(#a)">
      <Path d="M24 12a12 12 0 1 1-24 0 12 12 0 0 1 24 0Z" fill={color} />
      <Path
        d="M17.67 7.208c.14.056.267.14.374.247h.002a1.125 1.125 0 0 1 .015 1.575l-5.988 7.485a1.127 1.127 0 0 1-1.619.03l-3.968-3.97a1.125 1.125 0 0 1 1.59-1.59l3.139 3.14 5.21-6.637a1.125 1.125 0 0 1 1.244-.28Z"
        fill={COLORS.white}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={COLORS.white} d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
