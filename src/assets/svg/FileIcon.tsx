// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const FileIcon = (props: SvgProps) => (
  <Svg
    width={rem(19)}
    height={rem(23)}
    fill="none"
    viewBox="0 0 19 23"
    {...props}>
    <Path
      d="M10.7 2.30002V5.50002C10.7 7.26734 12.1327 8.70002 13.9 8.70002H17.1M16.7082 7.39516L12.8562 2.99281C12.2485 2.29836 11.3707 1.90002 10.4479 1.90002H4.7C2.93269 1.90002 1.5 3.33271 1.5 5.10002V17.9C1.5 19.6673 2.93269 21.1 4.7 21.1H14.3C16.0673 21.1 17.5 19.6673 17.5 17.9V9.50238C17.5 8.72726 17.2187 7.9785 16.7082 7.39516Z"
      stroke={props.color ?? COLORS.primaryDark}
      strokeWidth={props.strokeWidth ?? 2}
    />
  </Svg>
);
