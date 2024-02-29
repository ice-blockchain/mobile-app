// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const AlignIcon = ({
  color = COLORS.primaryLight,
  ...props
}: SvgProps) => (
  <Svg width={rem(24)} height={rem(24)} fill="none" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.5 19.2h-15a2 2 0 0 1-2-2V3"
    />
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="M16.4 16c-.748 0-1.122 0-1.4-.16a1.2 1.2 0 0 1-.44-.44c-.16-.278-.16-.652-.16-1.4V6.8c0-.748 0-1.121.16-1.4a1.2 1.2 0 0 1 .44-.44c.278-.16.652-.16 1.4-.16.748 0 1.121 0 1.4.16a1.2 1.2 0 0 1 .44.44c.16.279.16.652.16 1.4V14c0 .748 0 1.122-.16 1.4a1.2 1.2 0 0 1-.44.44c-.279.16-.652.16-1.4.16ZM9.4 16c-.748 0-1.122 0-1.4-.16a1.2 1.2 0 0 1-.44-.44c-.16-.279-.16-.652-.16-1.4V9.2c0-.748 0-1.122.16-1.4A1.2 1.2 0 0 1 8 7.36c.278-.16.652-.16 1.4-.16.748 0 1.121 0 1.4.16a1.2 1.2 0 0 1 .44.44c.16.278.16.652.16 1.4V14c0 .748 0 1.121-.16 1.4a1.2 1.2 0 0 1-.44.44c-.279.16-.652.16-1.4.16Z"
    />
  </Svg>
);
