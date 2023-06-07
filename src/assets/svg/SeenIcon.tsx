// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SeenIcon = (props: SvgProps) => (
  <Svg
    width={rem(12)}
    height={rem(13)}
    fill="none"
    viewBox="0 0 12 13"
    {...props}>
    <Path
      d="M0.205078 7.20504L3.00008 10L3.70508 9.29004L0.915078 6.50004M11.1201 3.29004L5.83008 8.58504L3.75008 6.50004L3.03508 7.20504L5.83008 10L11.8301 4.00004M9.00008 4.00004L8.29508 3.29004L5.12008 6.46504L5.83008 7.17004L9.00008 4.00004Z"
      fill={props.color ?? COLORS.primaryLight}
    />
  </Svg>
);
