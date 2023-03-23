// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';

export const PersonWithPenIcon = (props: SvgProps) => {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        d="M4 19.5789C4 15.8581 7.48497 12.8421 11.7838 12.8421M15.6757 6.94737C15.6757 8.57516 14.3204 9.89474 12.6486 9.89474C10.9769 9.89474 9.62162 8.57516 9.62162 6.94737C9.62162 5.31958 10.9769 4 12.6486 4C14.3204 4 15.6757 5.31958 15.6757 6.94737ZM14.3784 19.5789L18.7027 15.3684L16.973 13.6842L12.6486 17.8947V19.5789H14.3784Z"
        stroke={props.color ?? COLORS.secondary}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
