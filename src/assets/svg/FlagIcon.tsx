// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const FlagIcon = (props: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    fill="none"
    viewBox="0 0 20 20"
    {...props}>
    <Path
      d="M3.33325 12.5C3.33325 12.5 4.16659 11.6667 6.66659 11.6667C9.16659 11.6667 10.8333 13.3333 13.3333 13.3333C15.8333 13.3333 16.6666 12.5 16.6666 12.5V2.49999C16.6666 2.49999 15.8333 3.33332 13.3333 3.33332C10.8333 3.33332 9.16659 1.66666 6.66659 1.66666C4.16659 1.66666 3.33325 2.49999 3.33325 2.49999V12.5ZM3.33325 12.5V18.3333"
      strokeLinejoin={'round'}
      strokeLinecap={'round'}
      strokeWidth={props.strokeWidth ?? 2}
      stroke={props.color ?? COLORS.secondary}
    />
  </Svg>
);
