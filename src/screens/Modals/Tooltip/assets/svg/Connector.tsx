// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';

export const Connector = (props: SvgProps) => (
  <Svg width={48} height={45} fill="none" viewBox="0 0 48 45" {...props}>
    <G clipPath="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-144-309c0-11.046 8.954-20 20-20h295c11.046 0 20 8.954 20 20v289c0 11.046-8.954 20-20 20H47C35.954 0 27 8.954 27 20v1.563c0 10.47 8.445 18.776 17.754 23.568C59.746 52.849 70 68.477 70 86.5c0 25.681-20.819 46.5-46.5 46.5S-23 112.181-23 86.5c0-18.023 10.254-33.651 25.246-41.37C11.555 40.34 20 32.034 20 21.564V20C20 8.954 11.046 0 0 0h-124c-11.046 0-20-8.954-20-20v-289Z"
        fill={props.color}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={props.color} d="M0 0h48v45H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
