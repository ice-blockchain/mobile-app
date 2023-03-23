// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const BackButtonIcon = (props: SvgProps) => (
  <Svg width={16} height={14} viewBox={'0 0 16 14'} fill="none" {...props}>
    <Path
      d="M6 1 1 7m0 0 5 6M1 7h14"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
