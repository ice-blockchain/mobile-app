// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const BellIcon = (props: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox={'0 0 24 24'}
    fill="none"
    {...props}>
    <Path
      fill={props.color}
      d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2Zm10.065-2.352c.53.258.935.763.935 1.352H3c0-.59.405-1.095.934-1.352.52-.253 1.064-.64 1.064-1.148C5 15.5 5 11 5 11c0-3.1 2-5.8 5-6.7 0-1.1.898-1.8 1.998-1.8S14 3.2 14 4.3c3 .9 5 3.6 5 6.7v6.5c0 .51.545.895 1.065 1.148ZM17.498 11c0-2.8-2.7-5.5-5.5-5.5s-5.5 2.7-5.5 5.5v7.5h11V11Z"
    />
  </Svg>
);
