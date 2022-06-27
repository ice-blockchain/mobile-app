// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const DropdownIcon = (props: SvgProps) => (
  <Svg width={6} height={5} viewBox={'0 0 6 5'} fill="none" {...props}>
    <Path
      d="M3.72 4.251a1 1 0 0 1-1.44 0L.3 2.193C-.313 1.558.137.5 1.02.5h3.96c.882 0 1.332 1.058.72 1.693L3.72 4.251Z"
      fill={props.color ?? COLORS.white}
    />
  </Svg>
);
