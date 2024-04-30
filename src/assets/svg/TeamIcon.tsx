// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const TeamIcon = ({color = COLORS.white, ...props}: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    viewBox={'0 0 20 20'}
    fill="none"
    {...props}>
    <Path
      d="M15.5 9.53H17c.333 0 1 .188 1 .94v3.138c0 .94-1.5 2.51-3 2.51M4.5 9.528H3c-.333 0-1 .189-1 .941v3.138c0 .94 1.5 2.51 3 2.51m2.667-6.589h4.666c.445 0 1.334.251 1.334 1.255v3.451c0 .941-1.667 2.824-3.667 2.824-2 0-3.667-1.883-3.667-2.824v-3.45c0-.42.267-1.256 1.334-1.256Z"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
    <Path
      d="M12.209 4.824c0 1.297-1.017 2.323-2.238 2.323-1.222 0-2.238-1.026-2.238-2.323C7.733 3.526 8.749 2.5 9.97 2.5c1.221 0 2.238 1.026 2.238 2.324ZM17 5.529c0 .908-.71 1.618-1.553 1.618-.844 0-1.554-.71-1.554-1.618 0-.908.71-1.617 1.553-1.617.844 0 1.554.71 1.554 1.617Zm-10.952 0c0 .908-.71 1.618-1.553 1.618-.844 0-1.554-.71-1.554-1.618 0-.908.71-1.617 1.554-1.617.843 0 1.553.71 1.553 1.617Z"
      stroke={color}
      strokeWidth={1.4}
    />
  </Svg>
);
