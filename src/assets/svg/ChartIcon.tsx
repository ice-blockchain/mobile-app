// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ChartIcon = (props: SvgProps) => (
  <Svg width={23} height={24} fill="none" viewBox="0 0 23 24" {...props}>
    <Path
      d="M16.496 12.093h-5.588V6.506a.125.125 0 0 0-.125-.125h-.406a6.228 6.228 0 0 0-4.414 1.828 6.21 6.21 0 0 0-1.828 4.415 6.21 6.21 0 0 0 1.828 4.415 6.212 6.212 0 0 0 1.984 1.337 6.199 6.199 0 0 0 2.432.492 6.226 6.226 0 0 0 4.414-1.828 6.212 6.212 0 0 0 1.337-1.984 6.2 6.2 0 0 0 .492-2.431v-.407a.128.128 0 0 0-.126-.125Zm1.373-.867-.04-.44a6.227 6.227 0 0 0-5.625-5.612l-.443-.042a.124.124 0 0 0-.136.124v5.995c0 .069.057.125.125.125l5.994-.016a.125.125 0 0 0 .125-.134Z"
      fill={props.color}
    />
  </Svg>
);
