// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CameraIcon = ({
  color = COLORS.primaryDark,
  ...props
}: SvgProps) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M12.0833 3.3335H7.91666L5.83332 5.8335H3.33332C2.8913 5.8335 2.46737 6.00909 2.15481 6.32165C1.84225 6.63421 1.66666 7.05814 1.66666 7.50016V15.0002C1.66666 15.4422 1.84225 15.8661 2.15481 16.1787C2.46737 16.4912 2.8913 16.6668 3.33332 16.6668H16.6667C17.1087 16.6668 17.5326 16.4912 17.8452 16.1787C18.1577 15.8661 18.3333 15.4422 18.3333 15.0002V7.50016C18.3333 7.05814 18.1577 6.63421 17.8452 6.32165C17.5326 6.00909 17.1087 5.8335 16.6667 5.8335H14.1667L12.0833 3.3335Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 13.3335C11.3807 13.3335 12.5 12.2142 12.5 10.8335C12.5 9.45278 11.3807 8.3335 10 8.3335C8.61929 8.3335 7.5 9.45278 7.5 10.8335C7.5 12.2142 8.61929 13.3335 10 13.3335Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
