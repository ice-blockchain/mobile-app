// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export const menu = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#0A2155"
      strokeWidth={1.8}
      d="M9 5.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM22 5.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM9 18.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM22 18.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
    />
  </Svg>
);
