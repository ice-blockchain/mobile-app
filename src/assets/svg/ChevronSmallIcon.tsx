// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ChevronSmallIcon = (props: SvgProps) => {
  return (
    <Svg
      width={rem(12)}
      height={rem(12)}
      viewBox={'0 0 12 12'}
      fill={'none'}
      {...props}>
      <Path
        d={'m2 4.5 4 3.75 4-3.75'}
        stroke={props.color ?? COLORS.primary}
        strokeWidth={1.2}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </Svg>
  );
};
