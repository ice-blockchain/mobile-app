// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export const check = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path fill="#35D487" d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
    <Path
      fill="#fff"
      d="M16.725 8.007a.938.938 0 0 1 .312.206h.002a.938.938 0 0 1 .012 1.312l-4.99 6.238a.94.94 0 0 1-1.349.025l-3.307-3.309a.937.937 0 0 1 1.325-1.325l2.616 2.618 4.341-5.532a.938.938 0 0 1 1.038-.233Z"
    />
  </Svg>
);
