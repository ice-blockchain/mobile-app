// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export const help = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#0D265E"
      d="M18.75 17.25h-.016a.751.751 0 0 1-.705-.544l-2.377-8.313-1.45 3.87a.75.75 0 0 1-.702.487h-3v-1.5h2.48l2.068-5.513a.75.75 0 0 1 1.423.057l2.334 8.169 1.484-4.45A.75.75 0 0 1 21 9h3v1.5h-2.46l-2.079 6.237a.749.749 0 0 1-.711.513Zm-7.5 5.25h-1.5v-5.25A2.252 2.252 0 0 0 7.5 15h-3a2.252 2.252 0 0 0-2.25 2.25v5.25H.75v-5.25A3.754 3.754 0 0 1 4.5 13.5h3a3.754 3.754 0 0 1 3.75 3.75v5.25ZM6 6a2.25 2.25 0 1 1 0 4.5A2.25 2.25 0 0 1 6 6Zm0-1.5A3.75 3.75 0 1 0 6 12a3.75 3.75 0 0 0 0-7.5Z"
    />
  </Svg>
);
