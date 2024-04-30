// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const NextArrowIcon = (props: SvgProps) => {
  return (
    <Svg
      width={rem(24)}
      height={rem(24)}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Path
        d="M14 6L19 12M19 12L14 18M19 12H5"
        stroke={props.color || COLORS.white}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
