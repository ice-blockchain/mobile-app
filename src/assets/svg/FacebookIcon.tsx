// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const FacebookIcon = (props: SvgProps) => {
  return (
    <Svg
      width={rem(36)}
      height={rem(36)}
      viewBox="0 0 36 36"
      fill="none"
      {...props}>
      <Path
        d="M24.896 7.632H28V2.909c-.535-.064-2.377-.209-4.522-.209-4.475 0-7.54 2.46-7.54 6.978v4.16H11v5.279h4.938V32.4h6.054V19.118h4.739l.752-5.28h-5.492v-3.636c.001-1.526.472-2.57 2.905-2.57Z"
        fill="#3D6AD6"
      />
    </Svg>
  );
};
