// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const TeamInactiveIcon = (props: SvgProps) => (
  <Svg width={40} height={40} viewBox={'0 0 40 40'} fill="none" {...props}>
    <Path
      d="M28 19h2.5c.5 0 1.5.3 1.5 1.5v5c0 1.5-2.2 4-5 4M12 19H9.5C9 19 8 19.3 8 20.5v5c0 1.5 2.2 4 5 4M16.5 19h7c.667 0 2 .4 2 2v5.5C25.5 28 23 31 20 31s-5.5-3-5.5-4.5V21c0-.667.4-2 2-2Z"
      stroke={props.color ?? COLORS.secondary}
      strokeWidth={1.7}
      strokeLinecap="round"
    />
    <Path
      d="M23.3 12a3.3 3.3 0 1 1-6.6 0 3.3 3.3 0 0 1 6.6 0Zm7 1a2.3 2.3 0 1 1-4.6 0 2.3 2.3 0 0 1 4.6 0Zm-16 0a2.3 2.3 0 1 1-4.6 0 2.3 2.3 0 0 1 4.6 0Z"
      stroke={props.color ?? COLORS.secondary}
      strokeWidth={1.4}
    />
  </Svg>
);
