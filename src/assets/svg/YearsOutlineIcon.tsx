// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const YearsOutlineIcon = (props: SvgProps) => (
  <Svg width={23} height={22} viewBox={'0 0 23 22'} fill="none" {...props}>
    <Path
      d="M7.5 1v4m8-4v4m-14 4h20m-16-6h12a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-12a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
