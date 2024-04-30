// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CalendarIcon = (props: SvgProps) => (
  <Svg width={12} height={12} viewBox={'0 0 12 12'} fill="none" {...props}>
    <Path
      d="M4.08 1.2v1.92M7.92 1.2v1.92M1.2 5.04h9.6M3.12 2.16h5.76c1.06 0 1.92.86 1.92 1.92v4.8c0 1.06-.86 1.92-1.92 1.92H3.12A1.92 1.92 0 0 1 1.2 8.88v-4.8c0-1.06.86-1.92 1.92-1.92Z"
      stroke={props.color ?? COLORS.secondary}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
