// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Rect, Svg, SvgProps} from 'react-native-svg';

export const NextArrowSvg = (props: SvgProps) => {
  return (
    <Svg
      width="12"
      height="11"
      viewBox="0 0 12 11"
      fill={props.fill ?? COLORS.white}>
      <Rect
        y="5"
        width="11"
        height="1.5"
        rx="0.75"
        fill={props.fill ?? COLORS.white}
      />
      <Rect
        x="7.19995"
        y="0.600098"
        width="6.70096"
        height="1.5"
        rx="0.75"
        transform="rotate(52.0858 7.19995 0.600098)"
        fill={props.fill ?? COLORS.white}
      />
      <Rect
        width="6.70096"
        height="1.5"
        rx="0.75"
        transform="matrix(0.614481 -0.788932 -0.788932 -0.614481 7.19995 10.8999)"
        fill={props.fill ?? COLORS.white}
      />
    </Svg>
  );
};
