// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SymbolIcon = (props: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    fill="none"
    viewBox="0 0 20 20"
    {...props}>
    <Path
      d="M16.6666 8.33334V6.66668H13.3333V3.33334H11.6666V6.66668H8.33325V3.33334H6.66659V6.66668H3.33325V8.33334H6.66659V11.6667H3.33325V13.3333H6.66659V16.6667H8.33325V13.3333H11.6666V16.6667H13.3333V13.3333H16.6666V11.6667H13.3333V8.33334H16.6666ZM11.6666 11.6667H8.33325V8.33334H11.6666V11.6667Z"
      fill={props.color ?? COLORS.secondary}
    />
  </Svg>
);
