// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const HomeActiveIcon = (props: SvgProps) => (
  <Svg width={40} height={40} viewBox={'0 0 40 40'} fill="none" {...props}>
    <Path
      d="m31.34 18.38-9.708-9.701A2.302 2.302 0 0 0 19.997 8c-.629 0-1.207.251-1.635.679l-9.683 9.7a2.304 2.304 0 0 0 0 3.267c.402.402.956.653 1.534.679h.327v6.986A2.693 2.693 0 0 0 13.231 32h3.798c.453 0 .83-.377.83-.83v-5.578c0-.578.478-1.03 1.031-1.03h2.239c.578 0 1.03.477 1.03 1.03v5.579c0 .452.378.829.83.829h3.799a2.693 2.693 0 0 0 2.69-2.689v-7.012h.227c.629 0 1.207-.25 1.635-.678.88-.88.88-2.362 0-3.242Z"
      fill={props.color ?? COLORS.primaryLight}
    />
  </Svg>
);
