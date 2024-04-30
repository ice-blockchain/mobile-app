// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';

export const ChevronIcon = (props: SvgProps) => {
  return (
    <Svg width="9" height="16" viewBox="0 0 9 16" fill="none" {...props}>
      <Path
        d="M1.5 14.6667L7.75 8.00008L1.5 1.33342"
        stroke={props.color ?? COLORS.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
