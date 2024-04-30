// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const QuizSelectedIcon = (props: SvgProps) => (
  <Svg width={rem(24)} height={rem(24)} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path fill="#0166FF" d="M24 12a12 12 0 1 1-24 0 12 12 0 0 1 24 0Z" />
      <Path
        fill="#fff"
        d="M17.67 7.208c.14.056.267.14.374.247h.002a1.125 1.125 0 0 1 .015 1.575l-5.988 7.485a1.127 1.127 0 0 1-1.619.03l-3.968-3.97a1.125 1.125 0 0 1 1.59-1.59l3.139 3.14 5.21-6.637a1.125 1.125 0 0 1 1.244-.28Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
