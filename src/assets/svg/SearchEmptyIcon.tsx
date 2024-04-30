// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SearchEmptyIcon = ({color = COLORS.white, ...props}: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    viewBox={'0 0 20 20'}
    fill={'none'}
    {...props}>
    <Circle cx={9.75} cy={9.583} r={7.917} stroke={color} strokeWidth={1.6} />
    <Path
      d={'M7.667 9.583h4.166M16.833 16.667l1.667 1.666'}
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap={'round'}
    />
  </Svg>
);
