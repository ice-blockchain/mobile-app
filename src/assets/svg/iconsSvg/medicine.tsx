// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export const medicine = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#0D265E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.632 8.167v-2.5C8.632 5.11 8.968 4 10.316 4h3.368c.562 0 1.684.333 1.684 1.667v2.5m-5.894 5.416h5.052M12 11.083v5M5.263 8.167h13.474c.698 0 1.263.56 1.263 1.25v8.333c0 .69-.566 1.25-1.263 1.25H5.263C4.566 19 4 18.44 4 17.75V9.417c0-.69.566-1.25 1.263-1.25Z"
    />
  </Svg>
);
