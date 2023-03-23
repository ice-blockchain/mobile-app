// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const HomeInactiveIcon = (props: SvgProps) => (
  <Svg width={40} height={40} viewBox={'0 0 40 40'} fill="none" {...props}>
    <Path
      d="m9.245 18.945 9.682-9.7a1.502 1.502 0 0 1 1.07-.445c.41 0 .787.163 1.07.444l9.707 9.701c.568.567.568 1.543 0 2.11a1.502 1.502 0 0 1-1.069.445h-1.026v7.811c0 1.04-.849 1.889-1.891 1.889H22.99s-.009 0-.02-.01a.046.046 0 0 1-.009-.014.012.012 0 0 1-.001-.005v-5.58c0-.982-.799-1.83-1.831-1.83H18.89c-.982 0-1.83.798-1.83 1.83v5.58l-.002.005a.046.046 0 0 1-.01.013c-.01.011-.018.011-.019.011h-3.798a1.893 1.893 0 0 1-1.89-1.889v-7.786H10.232a1.534 1.534 0 0 1-.988-.445 1.504 1.504 0 0 1 0-2.135Z"
      stroke={COLORS.secondary}
      strokeWidth={1.6}
    />
  </Svg>
);
