// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const Chevron = (props: SvgProps) => (
  <Svg width={32} height={23} viewBox={'0 0 32 23'} fill="none" {...props}>
    <Path
      d="M12.796 20.317c1.242 2.739 5.961 2.67 7.142-.096 1.257-2.946 2.807-5.986 4.562-8.221 1.517-1.932 3.657-3.86 5.863-5.587C32.801 4.504 31.511 0 28.415 0H3.925C.876 0-.416 4.326 1.968 6.229 4.213 8.019 6.427 10.025 8 12c1.807 2.267 3.448 5.347 4.796 8.317Z"
      fill={props.color}
    />
  </Svg>
);
