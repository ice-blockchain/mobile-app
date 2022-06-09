// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const ProfileActiveIcon = () => (
  <Svg width={29} height={30} viewBox="0 0 27 28" fill="none">
    <Circle
      cx={13.5}
      cy={14}
      r={12.8}
      fill="#fff"
      stroke="#1B47C3"
      strokeWidth={1.4}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.49 7.1C11.161 7.088 9.23 9.005 9.23 11.34c0 1.33.615 2.517 1.572 3.295-.68.316-1.3.749-1.83 1.28a6.302 6.302 0 0 0-1.861 4.32.17.17 0 0 0 .17.175h12.426a.172.172 0 0 0 .121-.051.169.169 0 0 0 .048-.123 6.302 6.302 0 0 0-1.86-4.321 6.375 6.375 0 0 0-1.831-1.28 4.236 4.236 0 0 0 1.572-3.295c0-2.336-1.935-4.254-4.266-4.239Z"
      fill="#1B47C3"
    />
  </Svg>
);
