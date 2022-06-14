// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  fill?: string;
};

export const BackButtonArrow = ({fill = COLORS.white}: Props) => (
  <Svg width={16} height={15} fill="none">
    <Path
      d="M15 7H3.14l3.63-4.36a1.001 1.001 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 0 8a1 1 0 0 0 .07.36c0 .05 0 .08.07.13.026.051.056.102.09.15l5 6A1 1 0 0 0 6 15a1 1 0 0 0 .77-1.64L3.14 9H15a1 1 0 1 0 0-2Z"
      fill={fill}
    />
  </Svg>
);
