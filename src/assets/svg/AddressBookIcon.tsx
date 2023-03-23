// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const AddressBookIcon = ({color = COLORS.white, ...props}: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(22)}
    fill="none"
    viewBox="0 0 20 22"
    {...props}>
    <Path
      fill={color}
      d="M0 6h5v2H0zM9.5 12.377 13.35 8l1.198 1.054-3.85 4.377z"
    />
    <Path
      fill={color}
      d="m8.5 9.83 3.046 2.642-1.045 1.205-3.047-2.641zM0 14h5v2H0z"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 2h8a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Zm8-2a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5h8Z"
      fill={color}
    />
  </Svg>
);
