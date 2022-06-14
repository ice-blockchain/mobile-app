// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
} & SvgProps;

export const PenIcon = ({
  color = COLORS.darkBlue,
  width = 13,
  height = 13,
  ...props
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 13 13" fill="none" {...props}>
    <Path
      d="M11.878 3.376 9.74 1.23a.753.753 0 0 0-1.062 0L1.105 8.792l-.691 2.984a.75.75 0 0 0 .728.91.787.787 0 0 0 .156 0l3.017-.692 7.563-7.555a.754.754 0 0 0 0-1.063ZM3.95 11.34l-2.828.593.645-2.773 5.666-5.644 2.184 2.183L3.95 11.34Zm6.154-6.169L7.922 2.987l1.266-1.26 2.147 2.184-1.23 1.26Z"
      fill={color}
      stroke={color}
      strokeWidth={0.468}
    />
  </Svg>
);
