// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import {Circle, Svg, SvgProps} from 'react-native-svg';

export const TaskNotCompletedSvg = (props: SvgProps) => {
  return (
    <Svg width="23" height="23" viewBox="0 0 23 23" fill="none" {...props}>
      <Circle cx="11.2261" cy="11.8531" r="10.5" fill="white" />
      <Circle cx="11.2261" cy="11.8531" r="4" />
    </Svg>
  );
};
