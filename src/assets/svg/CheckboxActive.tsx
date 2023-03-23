// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const CheckboxActive = (props: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox={'0 0 24 24'}
    fill="none"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.125 1.5A2.625 2.625 0 0 0 1.5 4.125v15.75A2.626 2.626 0 0 0 4.125 22.5h15.75a2.625 2.625 0 0 0 2.625-2.625V4.125A2.625 2.625 0 0 0 19.875 1.5H4.125Z"
      fill={props.color ?? COLORS.shamrock}
    />
    <Path
      d="M17.971 8.633c.005.292-.103.574-.302.787l-6.75 6.75a1.125 1.125 0 0 1-1.59 0l-3-3a1.125 1.125 0 0 1 1.59-1.59l2.205 2.205L16.08 7.83a1.125 1.125 0 0 1 1.892.803Z"
      fill={COLORS.white}
    />
  </Svg>
);
