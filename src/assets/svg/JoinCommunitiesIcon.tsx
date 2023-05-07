// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const JoinCommunitiesIcon = (props: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <G clipPath={'url(#clip0_10200_34735)'}>
      <Path
        d="M4 7.6C4 4.48873 4 2.9331 5.00421 1.96655C6.00841 1 7.62465 1 10.8571 1H13.1429C16.3753 1 17.9916 1 18.9958 1.96655C20 2.9331 20 4.48873 20 7.6V16.4C20 19.5113 20 21.0669 18.9958 22.0335C17.9916 23 16.3753 23 13.1429 23H10.8571C7.62465 23 6.00841 23 5.00421 22.0335C4 21.0669 4 19.5113 4 16.4V7.6Z"
        stroke={props.color ?? COLORS.white}
        strokeWidth={1.8}
      />
      <Path
        d="M4 3C3.02491 3.10894 2.36857 3.35514 1.87868 3.91155C1 4.90956 1 6.51584 1 9.72839V14.2716C1 17.4842 1 19.0904 1.87868 20.0884C2.36857 20.6449 3.02491 20.8911 4 21"
        stroke={props.color ?? COLORS.white}
        strokeWidth={1.8}
      />
      <Path
        d="M20 3C20.9751 3.10894 21.6314 3.35514 22.1213 3.91155C23 4.90956 23 6.51584 23 9.72839V14.2716C23 17.4842 23 19.0904 22.1213 20.0884C21.6314 20.6449 20.9751 20.8911 20 21"
        stroke={props.color ?? COLORS.white}
        strokeWidth={1.8}
      />
      <Path
        d="M8 14H16"
        stroke={props.color ?? COLORS.white}
        strokeWidth={1.8}
        strokeLinecap={'round'}
      />
      <Path
        d="M8 8H16"
        stroke={props.color ?? COLORS.white}
        strokeWidth={1.8}
        strokeLinecap={'round'}
      />
      <Path
        d="M8 18H11"
        stroke={props.color ?? COLORS.white}
        strokeWidth={1.8}
        strokeLinecap={'round'}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_10200_34735">
        <Rect
          width={24}
          height={24}
          rx={5}
          fill={props.color ?? COLORS.white}
        />
      </ClipPath>
    </Defs>
  </Svg>
);
