// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const PenIcon = (props: SvgProps) => (
  <Svg width={10} height={10} fill="none" viewBox="0 0 10 10" {...props}>
    <Path
      d="M1.172 6.445.645 8.722a.572.572 0 0 0 .555.695c.04.004.08.004.12 0l2.291-.528 4.4-4.383-2.455-2.45-4.384 4.389ZM9.395 2.311 7.755.672a.575.575 0 0 0-.81 0l-.912.911 2.453 2.453.911-.91a.575.575 0 0 0-.002-.815Z"
      fill="#fff"
    />
  </Svg>
);
