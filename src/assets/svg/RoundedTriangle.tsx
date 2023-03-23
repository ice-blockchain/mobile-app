// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const RoundedTriangle = (props: SvgProps) => (
  <Svg width={18} height={16} viewBox={'0 0 18 16'} fill="none" {...props}>
    <Path d="M7.268 1c.77-1.333 2.694-1.333 3.464 0l6.928 12c.77 1.333-.192 3-1.732 3H2.072C.532 16-.43 14.333.34 13L7.268 1Z" />
  </Svg>
);
