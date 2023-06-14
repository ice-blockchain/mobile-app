// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';
export const stop = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M9 16h6a.968.968 0 0 0 .713-.288A.967.967 0 0 0 16 15V9a.97.97 0 0 0-.287-.713A.97.97 0 0 0 15 8H9a.967.967 0 0 0-.712.287A.968.968 0 0 0 8 9v6c0 .283.096.52.288.712A.965.965 0 0 0 9 16Z"
    />
    <Circle cx={12} cy={12} r={9.3} stroke="#fff" strokeWidth={1.4} />
  </Svg>
);
