// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const EmailNotificationIcon = ({
  color = COLORS.primaryLight,
  ...props
}: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(25)}
    fill="none"
    viewBox="0 0 24 25"
    {...props}>
    <G clipPath="url(#a)" stroke={color}>
      <Path
        d="M21.52 13.852c0 3.62 0 5.43-1.125 6.555s-2.935 1.125-6.555 1.125H10c-3.62 0-5.43 0-6.555-1.125-1.125-1.124-1.125-2.934-1.125-6.555 0-3.62 0-5.43 1.125-6.555C4.569 6.172 6.379 6.172 10 6.172h1"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="m6.16 10.012 2.073 1.727c1.763 1.47 2.644 2.204 3.687 2.204 1.043 0 2.08-.443 2.08-.443"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M21.724 4.872v-.33c0-1.813-1.528-3.282-3.413-3.282-1.885 0-3.413 1.47-3.413 3.282v.33c0 .396-.122.783-.35 1.113l-.56.808c-.512.737-.121 1.74.768 1.974 2.328.61 4.782.61 7.11 0 .89-.234 1.28-1.237.768-1.974l-.56-.808a1.952 1.952 0 0 1-.35-1.113Z"
        strokeWidth={1.4}
      />
      <Path
        d="M16.035 9.224c0 1.518 1.225 2.276 2.275 2.276 1.051 0 2.276-.758 2.276-2.276"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill={COLORS.white}
          transform="translate(0 .5)"
          d="M0 0h24v24H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
