// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {LinearGradient, Rect, Stop, SvgProps} from 'react-native-svg';

export const Indicator = (props: SvgProps) => (
  <Svg width={128} height={57} viewBox="0 0 128 57" fill="none" {...props}>
    <Rect width="128" height="57" fill="url(#paint0_linear_1_509)" />
    <LinearGradient
      id="paint0_linear_1_509"
      x1="108.231"
      y1="10.9073"
      x2="90.7059"
      y2="65.277"
      gradientUnits="userSpaceOnUse">
      <Stop stopColor="#11359C" />
      <Stop offset="1" stopColor="#1B47C3" />
    </LinearGradient>
  </Svg>
);
