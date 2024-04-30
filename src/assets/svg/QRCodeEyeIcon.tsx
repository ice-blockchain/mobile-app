// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

export const QRCodeEyeIcon = ({
  color = COLORS.primaryLight,
  ...props
}: SvgProps) => (
  <Svg viewBox="0 0 64 64" {...props}>
    <G fill={color} fillRule="nonzero">
      <Path d="M45.636 45.636H32c-7.727 0-13.636-5.909-13.636-13.636V18.364H32c7.727 0 13.636 5.909 13.636 13.636v13.636Z" />
      <Path d="M0 0v43.886C0 54.857 9.143 64 20.114 64H64V20.114C64 9.143 54.857 0 43.886 0H0Zm54.857 54.857H21.943c-6.857 0-12.8-5.943-12.8-12.8V9.143h32.914c6.857 0 12.8 5.943 12.8 12.8v32.914Z" />
    </G>
  </Svg>
);
