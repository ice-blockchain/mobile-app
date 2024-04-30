// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const TurnOffAllNotificationsIcon = (props: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <G clipPath="url(#a)">
      <Path d="M24 12a12 12 0 1 1-24 0 12 12 0 0 1 24 0Z" fill="#35D487" />
      <Path d="M7 12h10" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
