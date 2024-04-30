// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const YearsIcon = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" viewBox="0 0 22 22" {...props}>
    <Path
      d="M4.75 16.75a.5.5 0 0 0 .5.5h11.5a.5.5 0 0 0 .5-.5v-6.563H4.75v6.563Zm12-10.875h-2.625v-1A.125.125 0 0 0 14 4.75h-.875a.125.125 0 0 0-.125.125v1H9v-1a.125.125 0 0 0-.125-.125H8a.125.125 0 0 0-.125.125v1H5.25a.5.5 0 0 0-.5.5v2.75h12.5v-2.75a.5.5 0 0 0-.5-.5Z"
      fill={props.color}
    />
  </Svg>
);
