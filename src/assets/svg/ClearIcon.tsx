// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ClearIcon = (props: SvgProps) => (
  <Svg width={20} height={21} fill="none" {...props}>
    <Path
      d="M8 4h4a2 2 0 1 0-4 0ZM6.5 4a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 1 1 0 1.5h-1.32l-1.17 12.111A3.75 3.75 0 0 1 13.026 21H6.974a3.75 3.75 0 0 1-3.733-3.389L2.07 5.5H.75a.75.75 0 0 1 0-1.5H6.5Zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 1 0 1.5 0v-7.5ZM12.25 8a.75.75 0 0 1 .75.75v7.5a.75.75 0 1 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-7.516 9.467a2.25 2.25 0 0 0 2.24 2.033h6.052a2.25 2.25 0 0 0 2.24-2.033L16.424 5.5H3.576l1.158 11.967Z"
      fill={props.color}
    />
  </Svg>
);
