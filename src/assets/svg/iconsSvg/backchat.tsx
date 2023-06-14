// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const backchat = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#0D265E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="m14 5-7 7 7 7"
    />
  </Svg>
);
