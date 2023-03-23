// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const MedKitIcon = (props: SvgProps = {}) => {
  return (
    <Svg
      width={rem(25)}
      height={rem(24)}
      viewBox="0 0 25 24"
      fill="none"
      {...props}>
      <Path
        d="M9.132 8.167v-2.5C9.132 5.11 9.468 4 10.816 4h3.368c.562 0 1.684.333 1.684 1.667v2.5m-5.894 5.416h5.052m-2.526-2.5v5M5.763 8.167h13.474c.698 0 1.263.56 1.263 1.25v8.333c0 .69-.566 1.25-1.263 1.25H5.763c-.697 0-1.263-.56-1.263-1.25V9.417c0-.69.566-1.25 1.263-1.25Z"
        stroke={props.color ?? COLORS.white}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
