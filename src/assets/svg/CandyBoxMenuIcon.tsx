// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const CandyBoxMenuIcon = (props: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox={'0 0 24 24'}
    fill="none"
    {...props}>
    <Path
      d="M9 5.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM22 5.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM9 18.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM22 18.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      strokeWidth={1.8}
    />
  </Svg>
);
