// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SquareCheckboxActiveIcon = ({
  color = COLORS.white,
  ...props
}: SvgProps) => (
  <Svg
    width={rem(22)}
    height={rem(22)}
    fill="none"
    viewBox="0 0 22 22"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.125.5A2.625 2.625 0 0 0 .5 3.125v15.75A2.626 2.626 0 0 0 3.125 21.5h15.75a2.625 2.625 0 0 0 2.625-2.625V3.125A2.625 2.625 0 0 0 18.875.5H3.125Z"
        fill="#35D487"
      />
      <Path
        d="M16.972 7.633c.005.292-.103.574-.302.787l-6.75 6.75a1.125 1.125 0 0 1-1.59 0l-3-3a1.125 1.125 0 0 1 1.59-1.59l2.205 2.205L15.08 6.83a1.125 1.125 0 0 1 1.892.803Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={color} d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
