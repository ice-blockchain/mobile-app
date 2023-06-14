// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export const file = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      stroke="#0D265E"
      strokeWidth={1.5}
      d="M16.5 3.5v4a4 4 0 0 0 4 4h4m-.49-1.631-4.815-5.503A4 4 0 0 0 16.185 3H9a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V12.503a4 4 0 0 0-.99-2.634Z"
    />
  </Svg>
);
