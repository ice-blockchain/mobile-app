// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const TwitterIcon = ({color = COLORS.black, ...props}: SvgProps) => {
  return (
    <Svg
      width={rem(20)}
      height={rem(20)}
      viewBox="0 0 20 20"
      fill="none"
      {...props}>
      <Path
        fill={color}
        d="M11.42 8.99 16.687 3H15.44l-4.573 5.202L7.213 3H3l5.524 7.866L3 17.148h1.248l4.83-5.493 3.857 5.493h4.213L11.42 8.991Zm-1.71 1.945-.56-.783-4.452-6.233h1.917l3.594 5.03.56.784 4.67 6.538h-1.917l-3.811-5.336Z"
      />
    </Svg>
  );
};
