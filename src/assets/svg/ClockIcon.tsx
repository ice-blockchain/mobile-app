// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ClockIcon = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" viewBox="0 0 25 24" {...props}>
    <Path
      d="M12.5 6.238v6.286l3.143 2.619M23.5 12c0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11 11 4.925 11 11Z"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
