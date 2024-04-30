// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const EngagementCardIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox={'0 0 24 24'} fill="none" {...props}>
    <Path
      d="M21.6 23H2.4C1.76348 23 1.15303 22.7498 0.702944 22.3044C0.252856 21.859 0 21.2549 0 20.625V6.375C0 5.74511 0.252856 5.14102 0.702944 4.69562C1.15303 4.25022 1.76348 4 2.4 4H21.6C22.2365 4 22.847 4.25022 23.2971 4.69562C23.7471 5.14102 24 5.74511 24 6.375V20.625C24 21.2549 23.7471 21.859 23.2971 22.3044C22.847 22.7498 22.2365 23 21.6 23ZM2 6V21H22V6H2ZM4.8 9.9375H19.2V12.3125H4.8V9.9375ZM4.8 14.6875H16.8V17.0625H4.8V14.6875Z"
      fill={props.color ?? COLORS.primaryLight}
    />
  </Svg>
);
