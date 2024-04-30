// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const GraphUpIcon = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox={'0 0 18 18'} fill="none" {...props}>
    <Path
      d="M13 17V9m0 0 3 3m-3-3-3 3m-9-1 8-8 3 3 5-5"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
