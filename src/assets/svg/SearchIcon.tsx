// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SearchIcon = (props: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    viewBox="0 0 20 20"
    fill="none"
    {...props}>
    <Path
      d="M17.4491 17.4999L13.9997 14.0054M15.833 9.58325C15.833 13.035 13.0348 15.8333 9.58301 15.8333C6.13123 15.8333 3.33301 13.035 3.33301 9.58325C3.33301 6.13147 6.13123 3.33325 9.58301 3.33325C13.0348 3.33325 15.833 6.13147 15.833 9.58325Z"
      stroke={props.color ?? COLORS.secondary}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
