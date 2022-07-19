// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';

export const CloseIconSvg = (props: SvgProps) => {
  return (
    <Svg width="9" height="10" viewBox="0 0 9 10" fill="none" {...props}>
      <Path
        d="M8.07279 1.04649L0.99999 8.25459"
        stroke={props.fill ?? '#0C56C5'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M0.999998 1.04649L8.07279 8.25459"
        stroke={props.fill ?? '#0C56C5'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
