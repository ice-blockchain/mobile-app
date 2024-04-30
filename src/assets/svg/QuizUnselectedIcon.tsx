// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const QuizUnselectedIcon = (props: SvgProps) => (
  <Svg width={rem(24)} height={rem(25)} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="#707489"
        strokeWidth={2}
        d="M23 12.5a11 11 0 1 1-22 0 11 11 0 0 1 22 0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
