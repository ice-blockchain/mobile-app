// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ReplyIcon = (props: SvgProps) => (
  <Svg
    width={rem(12)}
    height={rem(12)}
    fill="none"
    viewBox="0 0 12 12"
    {...props}>
    <Path
      d="M4 8.6665H8.8L7.06667 10.3998L8 11.3332L11.3333 7.99984L8 4.6665L7.06667 5.59984L8.8 7.33317H4C2.53333 7.33317 1.33333 6.13317 1.33333 4.6665C1.33333 3.19984 2.53333 1.99984 4 1.99984H5.33333V0.666504H4C1.8 0.666504 0 2.4665 0 4.6665C0 6.8665 1.8 8.6665 4 8.6665Z"
      fill={props.color ?? COLORS.primaryLight}
    />
  </Svg>
);
