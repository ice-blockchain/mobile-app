// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ImageIcon = ({
  color = COLORS.primaryLight,
  ...props
}: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M2 6C2 4.93913 2.42143 3.92172 3.17157 3.17157C3.92172 2.42143 4.93913 2 6 2H18C19.0609 2 20.0783 2.42143 20.8284 3.17157C21.5786 3.92172 22 4.93913 22 6V18C22 19.0609 21.5786 20.0783 20.8284 20.8284C20.0783 21.5786 19.0609 22 18 22H6C4.93913 22 3.92172 21.5786 3.17157 20.8284C2.42143 20.0783 2 19.0609 2 18V6Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.5 11C9.88071 11 11 9.88071 11 8.5C11 7.11929 9.88071 6 8.5 6C7.11929 6 6 7.11929 6 8.5C6 9.88071 7.11929 11 8.5 11Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.526 12.6213L6 22.0003H18.133C19.1586 22.0003 20.1422 21.5929 20.8674 20.8677C21.5926 20.1425 22 19.1589 22 18.1333V18.0003C22 17.5343 21.825 17.3553 21.51 17.0103L17.48 12.6153C17.2922 12.4104 17.0637 12.2469 16.8092 12.1353C16.5546 12.0236 16.2796 11.9662 16.0017 11.9668C15.7237 11.9674 15.449 12.0259 15.1949 12.1385C14.9408 12.2512 14.713 12.4157 14.526 12.6213V12.6213Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
