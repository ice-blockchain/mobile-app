// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export const edit = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#707489"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M4 19.579c0-3.72 3.485-6.737 7.784-6.737m3.892-5.895c0 1.628-1.356 2.948-3.027 2.948-1.672 0-3.027-1.32-3.027-2.948C9.622 5.32 10.977 4 12.649 4c1.671 0 3.027 1.32 3.027 2.947ZM14.378 19.58l4.325-4.21-1.73-1.685-4.324 4.21v1.685h1.73Z"
    />
  </Svg>
);
