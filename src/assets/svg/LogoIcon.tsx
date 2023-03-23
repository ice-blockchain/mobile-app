// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';

export const LogoIcon = ({
  color = COLORS.primaryLight,
  width = 18,
  height = 18,
  ...props
}: SvgProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" {...props}>
      <Path
        d="m10 0-.935 6.239L10 9.372l.935-3.133L10 0ZM10 20l.935-6.239L10 10.628l-.935 3.133L10 20ZM20 10l-6.239-.935-3.133.935 3.133.935L20 10ZM0 10l6.239.935L9.372 10l-3.133-.935L0 10ZM17.028 2.886l-5.05 3.782-1.536 2.886 2.867-1.572 3.72-5.096ZM2.972 17.113l5.05-3.78 1.536-2.887-2.867 1.572-3.72 5.095ZM17.113 17.028l-3.781-5.05-2.886-1.537 1.572 2.868 5.095 3.72ZM2.887 2.972l3.781 5.05 2.886 1.536-1.572-2.867-5.095-3.72Z"
        fill={color}
      />
    </Svg>
  );
};
