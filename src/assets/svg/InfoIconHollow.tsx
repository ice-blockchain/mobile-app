// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';

export const InfoIconHollow = (props: SvgProps) => (
  <Svg width={11} height={11} fill="none" viewBox="0 0 11 11" {...props}>
    <Path
      d="M6.012 4.196V8.3H5.02V4.196h.992ZM6.148 3a.563.563 0 0 1-.052.24.642.642 0 0 1-.14.196.663.663 0 0 1-.2.136.642.642 0 0 1-.492 0 .679.679 0 0 1-.332-.332.642.642 0 0 1 0-.488.62.62 0 0 1 .332-.332.6.6 0 0 1 .492 0 .629.629 0 0 1 .392.58Z"
      fill="#0D265E"
    />
    <Circle cx={5.5} cy={5.5} r={5.1} stroke="#0D265E" strokeWidth={0.8} />
  </Svg>
);
