// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

export const LogoTransparentIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 52 52" fill="none" {...props}>
    <G opacity={0.25} fill={props.color ?? COLORS.white}>
      <Path d="m26 0-2.43 16.22L26 24.368l2.43-8.146L26 0ZM26 52l2.43-16.22L26 27.632l-2.43 8.146L26 52ZM52 26l-16.22-2.43L27.632 26l8.146 2.43L52 26ZM0 26l16.22 2.43L24.368 26l-8.146-2.43L0 26ZM44.274 7.504l-13.13 9.83-3.995 7.505 7.454-4.087 9.67-13.248ZM7.726 44.496l13.13-9.83 3.995-7.504-7.454 4.086-9.67 13.248ZM44.495 44.273l-9.83-13.13-7.504-3.995 4.086 7.454 13.248 9.67ZM7.505 7.728l9.83 13.129 7.504 3.995-4.086-7.454-13.248-9.67Z" />
    </G>
  </Svg>
);
