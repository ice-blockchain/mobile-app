// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ContactsIcon = (props: SvgProps) => (
  <Svg
    width={21}
    height={22}
    viewBox="0 0 21 22"
    fill={props.fill ?? COLORS.white}
    {...props}>
    <Path
      d="M15.5 6h-10c-.688 0-1.25.563-1.25 1.25v7.5c0 .688.563 1.25 1.25 1.25h10c.688 0 1.25-.563 1.25-1.25v-7.5c0-.688-.563-1.25-1.25-1.25Zm0 8.75h-10v-7.5h10v7.5ZM5.5 3.5h10v1.25h-10V3.5Zm0 13.75h10v1.25h-10v-1.25Zm5-6.25a1.563 1.563 0 1 0 0-3.126 1.563 1.563 0 0 0 0 3.126Zm0-2.188c.344 0 .625.282.625.626a.627.627 0 0 1-.625.624.627.627 0 0 1-.625-.624c0-.344.281-.626.625-.626Zm3.125 4.682c0-1.306-2.069-1.869-3.125-1.869s-3.125.563-3.125 1.869v.631h6.25v-.631Zm-5.119-.306c.381-.325 1.269-.626 1.994-.626.731 0 1.619.3 2 .626H8.506Z"
      fill={props.fill ?? COLORS.white}
    />
  </Svg>
);
