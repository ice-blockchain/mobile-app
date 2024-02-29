// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const RocketIcon = ({color = COLORS.white, ...props}: SvgProps) => (
  <Svg width={rem(16)} height={rem(16)} fill="none" {...props}>
    <Path
      fill={color}
      d="M3.902 10.682a.75.75 0 1 0-1.313-.725 4.764 4.764 0 0 0-.469 3.36.75.75 0 0 0 .564.563 4.76 4.76 0 0 0 3.359-.47.751.751 0 1 0-.725-1.312 3.232 3.232 0 0 1-1.81.393 3.232 3.232 0 0 1 .394-1.81"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M6.333 4.478A4 4 0 0 0 1 8.25c0 .414.336.75.75.75h3.322c.572.71 1.218 1.356 1.928 1.928v3.322c0 .414.336.75.75.75a4 4 0 0 0 3.772-5.333A10.72 10.72 0 0 0 15 1.75a.75.75 0 0 0-.75-.75 10.72 10.72 0 0 0-7.917 3.478ZM9 4l-.28 1.872.28.94.28-.94L9 4Zm0 6 .28-1.872-.28-.94-.28.94L9 10Zm3-3-1.872-.28-.94.28.94.28L12 7ZM6 7l1.872.28.94-.28-.94-.28L6 7Zm5.108-2.134L9.594 6l-.462.866.86-.472 1.116-1.528ZM6.892 9.134 8.406 8l.462-.866-.86.472-1.116 1.528Zm4.242-.026L10 7.594l-.866-.462.471.86 1.529 1.116ZM6.866 4.892 8 6.406l.866.462-.471-.86-1.529-1.116Z"
      clipRule="evenodd"
    />
  </Svg>
);
