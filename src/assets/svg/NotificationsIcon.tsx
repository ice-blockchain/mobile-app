// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const NotificationsIcon = ({fill, ...props}: SvgProps) => (
  <Svg width={22} height={23} viewBox="0 0 22 23" fill="none" {...props}>
    <Path
      d="M12.072 19.693a1.341 1.341 0 0 1-1.341 1.342M9.39 19.693a1.341 1.341 0 0 0 1.34 1.342M9.39 18.352v1.34M12.072 18.352v1.34M18.779 17.01c-2.683 1.342-6.707 1.342-8.048 1.342"
      stroke={fill ?? COLORS.white}
      strokeWidth={1.55}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.779 17.011c0-2.683-2.683-1.341-2.683-8.048 0-3-2.683-5.365-4.024-5.365M2.683 17.01c2.682 1.342 6.706 1.342 8.048 1.342"
      stroke={fill ?? COLORS.white}
      strokeWidth={1.55}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.683 17.011c0-2.683 2.682-1.341 2.682-8.048 0-3 2.683-5.365 4.024-5.365M9.39 3.597a1.341 1.341 0 0 1 1.34-1.341M12.072 3.597a1.342 1.342 0 0 0-1.341-1.341"
      stroke={fill ?? COLORS.white}
      strokeWidth={1.55}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
