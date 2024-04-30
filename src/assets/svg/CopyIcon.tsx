// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {G, Path, Svg, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const CopyIcon = ({color = COLORS.primaryLight, ...props}: SvgProps) => {
  return (
    <Svg width={rem(17)} height={rem(20)} viewBox="0 0 17 20" {...props}>
      <G>
        <Path
          d="M5.20312 2.8V13.6C5.20312 14.0774 5.39277 14.5352 5.73033 14.8728C6.0679 15.2104 6.52574 15.4 7.00313 15.4H14.2031C14.6805 15.4 15.1384 15.2104 15.4759 14.8728C15.8135 14.5352 16.0031 14.0774 16.0031 13.6V5.7178C16.0031 5.478 15.9552 5.24063 15.8621 5.01962C15.7691 4.79861 15.6328 4.59842 15.4613 4.4308L12.4778 1.513C12.1416 1.18419 11.6899 1.00006 11.2196 1H7.00313C6.52574 1 6.0679 1.18964 5.73033 1.52721C5.39277 1.86477 5.20313 2.32261 5.20312 2.8Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.4016 15.4V17.2C12.4016 17.6774 12.2119 18.1352 11.8744 18.4728C11.5368 18.8104 11.079 19 10.6016 19H3.40156C2.92417 19 2.46634 18.8104 2.12877 18.4728C1.7912 18.1352 1.60156 17.6774 1.60156 17.2V7.3C1.60156 6.82261 1.7912 6.36477 2.12877 6.02721C2.46634 5.68964 2.92417 5.5 3.40156 5.5H5.20156"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};
