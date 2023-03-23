// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const PushNotificationIcon = ({
  color = COLORS.primaryLight,
  ...props
}: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <Path
      d="M10.5 3.5c-2.99.009-4.195.244-5.215 1.265C4.16 5.889 4.16 7.7 4.16 11.32v3.84c0 3.62 0 5.43 1.125 6.555 1.124 1.125 2.934 1.125 6.555 1.125 3.62 0 5.43 0 6.555-1.125 1.125-1.124 1.125-2.935 1.125-6.555V14M14.72 19.96H8.96"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M20.724 4.372v-.33c0-1.813-1.528-3.282-3.413-3.282-1.885 0-3.413 1.47-3.413 3.282v.33c0 .396-.122.783-.35 1.113l-.56.808c-.512.737-.121 1.74.768 1.974 2.328.61 4.782.61 7.11 0 .89-.234 1.28-1.237.768-1.974l-.56-.808a1.952 1.952 0 0 1-.35-1.113Z"
      stroke={color}
      strokeWidth={1.4}
    />
    <Path
      d="M15.035 8.724c0 1.518 1.225 2.276 2.275 2.276 1.051 0 2.276-.758 2.276-2.276"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
);
