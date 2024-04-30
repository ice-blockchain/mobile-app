// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const PhoneIcon = (props: SvgProps) => (
  <Svg width={12} height={19} viewBox={'0 0 12 19'} fill="none" {...props}>
    <Path
      d="M4.5 14.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3ZM2 .75h8c.69 0 1.25.56 1.25 1.25v15c0 .69-.56 1.25-1.25 1.25H2c-.69 0-1.25-.56-1.25-1.25V2C.75 1.31 1.31.75 2 .75Z"
      stroke={props.color ?? COLORS.secondary}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
