// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Circle, SvgProps} from 'react-native-svg';

export const CircleIcon = (props: SvgProps) => (
  <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
    <Circle cx="4" cy="7" r="4" fill={props.color} />
  </Svg>
);
