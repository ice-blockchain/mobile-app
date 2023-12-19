// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ArrowLink = (props: SvgProps) => (
  <Svg
    width={rem(16)}
    height={rem(16)}
    fill="none"
    viewBox="0 0 16 16"
    {...props}>
    <Path
      d="m9 7 5-5m-3.333 0H14v3.333m0 4v3.334A1.334 1.334 0 0 1 12.667 14H3.333A1.334 1.334 0 0 1 2 12.667V3.333A1.333 1.333 0 0 1 3.333 2h3.334"
      stroke={props.color ?? COLORS.shamrock}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
