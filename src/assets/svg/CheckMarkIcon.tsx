// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CheckMarkIcon = (props: SvgProps) => (
  <Svg width={8} height={7} viewBox={'0 0 8 7'} fill="none" {...props}>
    <Path
      d="M2.996 3.556 1.7 2.286.3 3.715l2.704 2.646 4.699-4.65L6.297.288 2.996 3.556Z"
      fill={props.fill ?? '#35D487'}
    />
  </Svg>
);
