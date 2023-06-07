// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ChannelIcon = (props: SvgProps) => (
  <Svg
    width={rem(14)}
    height={rem(14)}
    fill="none"
    viewBox="0 0 14 14"
    {...props}>
    <Path
      d="M3.77238 0.409058C2.19108 0.409058 0.90918 1.69096 0.90918 3.27226V10.5604C0.90918 12.1417 2.19107 13.4236 3.77238 13.4236H10.4098C11.9911 13.4236 13.273 12.1417 13.273 10.5604V3.27226C13.273 1.69096 11.9911 0.409058 10.4098 0.409058H3.77238ZM4.16269 3.59759C3.76736 3.59759 3.44689 3.91807 3.44689 4.31339C3.44689 4.70872 3.76736 5.02919 4.16269 5.02919H10.3446C10.7399 5.02919 11.0604 4.70872 11.0604 4.31339C11.0604 3.91807 10.7399 3.59759 10.3446 3.59759H4.16269ZM4.16269 6.2005C3.76736 6.2005 3.44689 6.52098 3.44689 6.9163C3.44689 7.31163 3.76736 7.6321 4.16269 7.6321H8.71778C9.1131 7.6321 9.43358 7.31163 9.43358 6.9163C9.43358 6.52098 9.1131 6.2005 8.71778 6.2005H4.16269ZM4.16269 8.80341C3.76736 8.80341 3.44689 9.12389 3.44689 9.51921C3.44689 9.91454 3.76736 10.235 4.16269 10.235H6.7656C7.16092 10.235 7.4814 9.91454 7.4814 9.51921C7.4814 9.12389 7.16092 8.80341 6.7656 8.80341H4.16269Z"
      fill={props.color ?? COLORS.vibrantTangerine}
      fillRule={'evenodd'}
      clipRule={'evenodd'}
    />
  </Svg>
);
