// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Circle, Svg} from 'react-native-svg';

export const TaskNotCompletedSvg = () => {
  return (
    <Svg width="23" height="23" viewBox="0 0 23 23" fill="none">
      <Circle
        cx="11.2261"
        cy="11.8531"
        r="10.5"
        fill="white"
        stroke="#35D487"
      />
      <Circle cx="11.2261" cy="11.8531" r="4" fill="#35D487" />
    </Svg>
  );
};
