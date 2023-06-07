// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const PlusIcon = (props: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(25)}
    fill="none"
    viewBox="0 0 24 25"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M12 12.5H6M12 12.5H18M12 12.5V6.5M12 12.5V18.5"
        strokeWidth={props.strokeWidth ?? 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={props.color ?? COLORS.primaryLight}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={rem(24)} height={rem(24)} fill={COLORS.white} />
      </ClipPath>
    </Defs>
  </Svg>
);
