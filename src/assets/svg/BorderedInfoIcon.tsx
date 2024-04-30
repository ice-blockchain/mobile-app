// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const BorderedInfoIcon = ({
  color = COLORS.shamrock,
  width = rem(16),
  height = rem(16),
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 16 16" {...props}>
    <Circle cx={8} cy={8} r={7.36} stroke={color} strokeWidth={1.28} />
    <Path
      d="M8.677 5.974v5.746H7.288V5.974h1.389Zm.19-1.674c0 .12-.024.231-.072.336a.9.9 0 0 1-.196.274.929.929 0 0 1-.28.19.899.899 0 0 1-.348.068.885.885 0 0 1-.341-.067.95.95 0 0 1-.465-.465.899.899 0 0 1 0-.683.928.928 0 0 1 .19-.28.867.867 0 0 1 .275-.185.839.839 0 0 1 .689 0 .851.851 0 0 1 .28.185.88.88 0 0 1 .268.627Z"
      fill={color}
    />
  </Svg>
);
