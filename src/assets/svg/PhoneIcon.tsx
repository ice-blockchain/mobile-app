// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Circle, Path, Rect, Svg} from 'react-native-svg';

export const PhoneIconSvg = () => {
  return (
    <Svg width="10" height="13" viewBox="0 0 10 13" fill="none">
      <Rect x="0.5" y="0.5" width="9" height="12" rx="2.5" stroke="#B6B4BA" />
      <Circle cx="2.5" cy="2.5" r="0.5" fill="#C4C4C4" />
      <Path d="M3 10.5H7" stroke="#B6B4BA" stroke-linecap="round" />
    </Svg>
  );
};
