// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const CopyLinkIcon = (props: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    fill="none"
    viewBox="0 0 20 20"
    {...props}>
    <Path
      d="M16.5882 2H3.41176C2.63207 2 2 2.63207 2 3.41176V16.5882C2 17.3679 2.63207 18 3.41176 18H16.5882C17.3679 18 18 17.3679 18 16.5882V3.41176C18 2.63207 17.3679 2 16.5882 2Z"
      stroke={props.color ?? COLORS.primaryDark}
      strokeWidth={props.strokeWidth ?? 1.5}
      strokeLinejoin={'round'}
    />
    <Path
      d="M8.93918 8.22227L11.6666 5.52315C12.4145 4.81237 13.6442 4.82755 14.4127 5.55842C15.1811 6.2888 15.1976 7.4576 14.4498 8.16839L13.4654 9.15937M6.37561 10.9836C6.11276 11.2334 5.56902 11.7331 5.56902 11.7331C4.82067 12.4439 4.80005 13.7111 5.56902 14.442C6.33696 15.1719 7.56669 15.1881 8.31504 14.4768L10.9765 12.1803"
      stroke={props.color ?? COLORS.primaryDark}
      strokeWidth={props.strokeWidth ?? 1.5}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
    <Path
      d="M9.07117 10.7078C8.73559 10.3855 8.53254 9.95628 8.4998 9.50003C8.48045 9.24409 8.51825 8.98711 8.61065 8.74652C8.70304 8.50594 8.84787 8.28738 9.0353 8.10565M11 9.5C11.7532 10.2282 11.7694 11.3935 11.0364 12.1027"
      stroke={props.color ?? COLORS.primaryDark}
      strokeWidth={props.strokeWidth ?? 1.5}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
  </Svg>
);
