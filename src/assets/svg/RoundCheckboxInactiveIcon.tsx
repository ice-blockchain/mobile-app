// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const RoundCheckboxInactiveIcon = (props: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0Z"
        stroke={COLORS.secondary}
        strokeWidth={2}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={COLORS.white} d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
