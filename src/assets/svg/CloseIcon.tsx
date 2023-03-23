// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CloseIcon = (props: SvgProps) => (
  <Svg width={14} height={14} fill="none" viewBox="0 0 14 14" {...props}>
    <Path
      d="m8.41 7 4.3-4.29a1.004 1.004 0 1 0-1.42-1.42L7 5.59l-4.29-4.3a1.004 1.004 0 0 0-1.42 1.42L5.59 7l-4.3 4.29a1 1 0 0 0 0 1.42.998.998 0 0 0 1.42 0L7 8.41l4.29 4.3a.998.998 0 0 0 1.42 0 .997.997 0 0 0 .219-1.095.998.998 0 0 0-.22-.325L8.41 7Z"
      fill={props.color}
    />
  </Svg>
);
