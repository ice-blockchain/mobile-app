// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const WalletIcon = ({color = COLORS.white, ...props}: SvgProps) => (
  <Svg
    width={rem(21)}
    height={rem(21)}
    fill="none"
    viewBox="0 0 21 21"
    {...props}>
    <Path
      d="M12.722 2.141a.376.376 0 0 1 .529-.06l.81.65-2.962 3.77h1.908l2.226-2.833 1.878 1.505a.375.375 0 0 1 .05.538l-.681.79h1.96a1.875 1.875 0 0 0-.391-2.499L14.189.911a1.875 1.875 0 0 0-2.642.299L7.357 6.5H9.27l3.452-4.359Zm1.528 11.11a.75.75 0 1 0 0 1.5h2.25a.75.75 0 0 0 0-1.5h-2.25ZM3 4.25A2.25 2.25 0 0 0 .75 6.5v10.874a3.375 3.375 0 0 0 3.375 3.375h12.75a3.375 3.375 0 0 0 3.375-3.375v-6.75a3.375 3.375 0 0 0-3.375-3.375H3a.75.75 0 1 1 0-1.5h3.435l1.197-1.5H3Zm-.75 13.124V8.623c.235.082.487.127.75.127h13.875a1.875 1.875 0 0 1 1.875 1.875v6.75a1.875 1.875 0 0 1-1.875 1.875H4.125a1.875 1.875 0 0 1-1.875-1.875Z"
      fill={color}
    />
  </Svg>
);
