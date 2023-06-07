// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SentIcon = (props: SvgProps) => (
  <Svg
    width={rem(12)}
    height={rem(13)}
    fill="none"
    viewBox="0 0 12 13"
    {...props}>
    <Path
      d="M10.5 4.00004L4.5 10L1.75 7.25004L2.455 6.54504L4.5 8.58504L9.795 3.29504L10.5 4.00004Z"
      fill={props.color ?? COLORS.secondary}
    />
  </Svg>
);
