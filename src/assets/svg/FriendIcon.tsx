// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';

export const FriendIcon = (props: SvgProps) => (
  <Svg width={18} height={14} viewBox="0 0 18 14" fill="none" {...props}>
    <Path
      d="M8.59 7.25c1.48 0 2.678-1.174 2.678-2.625C11.268 3.175 10.07 2 8.59 2S5.912 3.174 5.912 4.625c0 1.45 1.198 2.625 2.678 2.625Zm1.836.75h-.198a3.828 3.828 0 0 1-1.638.375c-.588 0-1.138-.14-1.638-.375h-.198C5.234 8 4 9.21 4 10.7v.675c0 .621.514 1.125 1.147 1.125h6.886c.633 0 1.147-.504 1.147-1.125V10.7c0-1.49-1.234-2.7-2.754-2.7Z"
      fill="#fff"
    />
    <Circle cx={12.5} cy={11.5} r={2.5} fill={props.color} />
  </Svg>
);
