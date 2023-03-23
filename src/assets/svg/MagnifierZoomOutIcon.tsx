// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';

export const MagnifierZoomOutIcon = (props: SvgProps) => (
  <Svg width={31} height={30} viewBox="0 0 31 30" fill="none" {...props}>
    <Circle
      cx={15.125}
      cy={14.375}
      r={11.875}
      stroke={props.color ?? COLORS.secondary}
      strokeWidth={2}
    />
    <Path
      d="M25.75 25L28.25 27.5"
      stroke={props.color ?? COLORS.secondary}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
