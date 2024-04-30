// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CompletedTrophyIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M12 15c3.313 0 6-2.765 6-6.177V2H6v6.823C6 12.235 8.687 15 12 15Z"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Path
      d="M6 10.5v-5H2c0 3.334 2 5 4 5Zm12 0v-5h4c0 3.334-2 5-4 5ZM12 16v2"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m7.5 21 1.845-3h5.176l1.979 3h-9Z"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </Svg>
);
