// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const FireIcon = (props: SvgProps) => (
  <Svg width={18} height={24} viewBox={'0 0 18 24'} fill="none" {...props}>
    <Path
      d="M9 24c4.971 0 9-3 9-8.25 0-2.25-.75-6-3.75-9 .375 2.25-1.875 3-1.875 3C13.5 6 10.5.75 6 0c.535 3 .75 6-3 9-1.875 1.5-3 4.094-3 6.75C0 21 4.029 24 9 24Zm0-1.5c-2.486 0-4.5-1.5-4.5-4.125 0-1.125.375-3 1.875-4.5C6.187 15 7.5 15.75 7.5 15.75c-.563-1.875.75-4.875 3-5.25-.268 1.5-.375 3 1.5 4.5.938.75 1.5 2.046 1.5 3.375C13.5 21 11.486 22.5 9 22.5Z"
      fill={props.color ?? COLORS.white}
    />
  </Svg>
);
