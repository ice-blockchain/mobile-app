// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const WhiteLogoSvg = (props: SvgProps) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
    <Path
      d="m14 0-1.309 8.734L14 13.121l1.309-4.387L14 0ZM14 28l1.309-8.734L14 14.879l-1.309 4.387L14 28ZM28 14l-8.734-1.309L14.879 14l4.387 1.309L28 14ZM0 14l8.734 1.309L13.121 14l-4.387-1.309L0 14ZM23.84 4.04l-7.07 5.294-2.151 4.04 4.014-2.2L23.84 4.04ZM4.16 23.96l7.07-5.294 2.151-4.04-4.014 2.2L4.16 23.96ZM23.959 23.839l-5.294-7.07-4.04-2.151 2.2 4.014 7.134 5.207ZM4.041 4.161l5.294 7.07 4.04 2.151-2.2-4.014L4.04 4.161Z"
      fill="#fff"
    />
  </Svg>
);
