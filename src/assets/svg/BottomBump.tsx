// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const BottomBump = (props: SvgProps) => (
  <Svg width={62} height={8} viewBox={'0 0 62 8'} fill="none" {...props}>
    <Path
      d="M.012 0C12.007 0 20.004 8 31 8c10.995 0 18.993-8 30.989-8H.012Z"
      fill={props.color ?? COLORS.primaryDark}
    />
  </Svg>
);
