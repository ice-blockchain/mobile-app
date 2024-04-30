// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const BookIcon = ({color = COLORS.white, ...props}: SvgProps) => (
  <Svg width={rem(25)} height={rem(24)} fill="none" {...props}>
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="M12.5 6.38c-.985-.84-2.413-.965-3.713-.836-1.514.152-3.042.666-3.994 1.096a.499.499 0 0 0-.293.451v10.913a.493.493 0 0 0 .23.417.503.503 0 0 0 .477.035c.882-.397 2.303-.875 3.68-1.012 1.409-.141 2.59.086 3.223.87a.499.499 0 0 0 .39.185m0-12.119c.985-.84 2.413-.966 3.713-.836 1.514.152 3.042.666 3.994 1.096a.499.499 0 0 1 .293.451v10.913a.492.492 0 0 1-.23.417.503.503 0 0 1-.477.035c-.881-.397-2.303-.875-3.681-1.012-1.408-.141-2.589.086-3.222.87a.499.499 0 0 1-.39.185m0-12.119V18.5"
    />
  </Svg>
);
