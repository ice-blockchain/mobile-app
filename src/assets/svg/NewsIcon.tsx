// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units/index';

export const NewsIcon = ({color = COLORS.white, ...props}: SvgProps) => {
  return (
    <Svg width={rem(24)} height={rem(24)} viewBox="0 0 24 24" {...props}>
      <Path
        stroke={color}
        d="M5 8C5 5.17157 5 3.75736 5.87868 2.87868C6.75736 2 8.17157 2 11 2H13C15.8284 2 17.2426 2 18.1213 2.87868C19 3.75736 19 5.17157 19 8V16C19 18.8284 19 20.2426 18.1213 21.1213C17.2426 22 15.8284 22 13 22H11C8.17157 22 6.75736 22 5.87868 21.1213C5 20.2426 5 18.8284 5 16V8Z"
      />
      <Path
        stroke={color}
        d="M5 4.5C3.69989 4.59078 2.82475 4.79595 2.17157 5.25963C1 6.0913 1 7.42987 1 10.107V13.893C1 16.5701 1 17.9087 2.17157 18.7404C2.82475 19.2041 3.69989 19.4092 5 19.5"
      />
      <Path
        stroke={color}
        d="M19 4.07422C19.9751 4.17013 20.6314 4.38689 21.1213 4.87678C22 5.75546 22 7.16967 22 9.9981V13.9981C22 16.8265 22 18.2407 21.1213 19.1194C20.6314 19.6093 19.9751 19.8261 19 19.922"
      />
      <Path
        stroke={color}
        d="M9 13H15"
        strokeWidth={1.8}
        strokeLinecap={'round'}
      />
      <Path
        stroke={color}
        d="M9 9H15"
        strokeWidth={1.8}
        strokeLinecap={'round'}
      />
      <Path
        stroke={color}
        d="M9 17H12"
        strokeWidth={1.8}
        strokeLinecap={'round'}
      />
    </Svg>
  );
};
