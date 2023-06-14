// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export const heart = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#0D265E"
      d="M20.477 9a1.997 1.997 0 0 0-1.43.604l-.296.304-.297-.303a1.997 1.997 0 0 0-2.862 0 2.1 2.1 0 0 0 0 2.921l3.16 3.224 3.156-3.223a2.1 2.1 0 0 0 0-2.922A1.998 1.998 0 0 0 20.478 9ZM1.5 22.5H3v-3.75A3.754 3.754 0 0 1 6.75 15h4.5A3.754 3.754 0 0 1 15 18.75v3.75h1.5v-3.75a5.256 5.256 0 0 0-5.25-5.25h-4.5a5.256 5.256 0 0 0-5.25 5.25v3.75ZM9 3a3.75 3.75 0 1 1 0 7.5A3.75 3.75 0 0 1 9 3Zm0-1.5A5.25 5.25 0 1 0 9 12 5.25 5.25 0 0 0 9 1.5Z"
    />
  </Svg>
);
