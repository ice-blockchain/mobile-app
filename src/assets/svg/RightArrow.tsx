// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';

export const RightArrowSvg = (props: SvgProps) => {
  return (
    <Svg width="10" height="21" viewBox="0 0 10 21" {...props}>
      <Path
        d="M1.25 19.25L8.75 10.25L1.25 1.25"
        stroke={props.fill ?? COLORS.white}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
