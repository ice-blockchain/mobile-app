// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SelectIcon = (props: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    fill="none"
    viewBox="0 0 20 20"
    {...props}>
    <Path
      d="M2.5 7.5V16.1667C2.5 16.6333 2.5 16.8667 2.59083 17.045C2.67073 17.2018 2.79821 17.3293 2.955 17.4092C3.13333 17.5 3.36667 17.5 3.83167 17.5H12.5M14.1667 6.66667L10.8333 10L9.16667 8.33333M5.83333 11.5V5.16667C5.83333 4.23333 5.83333 3.76667 6.015 3.41C6.175 3.09583 6.42917 2.84167 6.74333 2.68167C7.1 2.5 7.56667 2.5 8.5 2.5H14.8333C15.7667 2.5 16.2333 2.5 16.59 2.68167C16.9036 2.84145 17.1585 3.09641 17.3183 3.41C17.5 3.76667 17.5 4.23333 17.5 5.16667V11.5C17.5 12.4333 17.5 12.9 17.3183 13.2567C17.1585 13.5702 16.9036 13.8252 16.59 13.985C16.2333 14.1667 15.7683 14.1667 14.8367 14.1667H8.4975C7.56583 14.1667 7.09917 14.1667 6.74333 13.985C6.42974 13.8252 6.17479 13.5703 6.015 13.2567C5.83333 12.9 5.83333 12.4333 5.83333 11.5Z"
      stroke={props.color ?? COLORS.primaryDark}
      strokeWidth={props.strokeWidth ?? 1.5}
      strokeLinejoin={'round'}
      strokeLinecap={'round'}
    />
  </Svg>
);
