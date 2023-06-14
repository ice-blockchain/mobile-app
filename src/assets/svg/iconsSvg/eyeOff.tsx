// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export const eyeOff = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#0D265E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.88 9.88a3 3 0 1 0 4.24 4.24m-3.39-9.04C11.15 5.028 11.575 5 12 5c7 0 10 7 10 7a13.163 13.163 0 0 1-1.67 2.68"
    />
    <Path
      stroke="#0D265E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M3.5 3.5 20 20"
    />
  </Svg>
);
