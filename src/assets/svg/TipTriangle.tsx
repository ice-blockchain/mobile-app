// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';

export const TipTriangleIcon = (props: SvgProps) => {
  return (
    <Svg width="15" height="10" viewBox="0 0 15 10" fill="none" {...props}>
      <Path
        d="M.57 9.49.453.087l14.009.011L.57 9.49Z"
        fill={props.color ?? COLORS.primaryDark}
      />
    </Svg>
  );
};
