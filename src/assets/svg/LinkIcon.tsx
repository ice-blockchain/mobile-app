// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {G, Path, Svg, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const CopyIcon = ({color = COLORS.secondary, ...props}: SvgProps) => {
  return (
    <Svg width={rem(24)} height={rem(24)} viewBox="0 0 24 24" {...props}>
      <G>
        <Path
          d="M9.14837 14.2908L14.8516 9.70922M7.46847 10.988L5.32975 12.7061C4.57345 13.3137 4.10022 14.184 4.01418 15.1256C3.92813 16.0671 4.23631 17.0029 4.87092 17.7269C5.50553 18.451 6.41459 18.9041 7.39811 18.9864C8.38163 19.0688 9.35905 18.7738 10.1154 18.1662L12.2541 16.4481M11.7459 7.55187L13.8846 5.83378C14.6409 5.22623 15.6184 4.93119 16.6019 5.01357C17.5854 5.09595 18.4945 5.549 19.1291 6.27305C19.7637 6.9971 20.0719 7.93285 19.9858 8.87444C19.8998 9.81603 19.4266 10.6863 18.6703 11.2939L16.5315 13.012"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};
