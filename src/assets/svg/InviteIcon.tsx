// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const InviteIcon = (props: SvgProps) => (
  <Svg
    width={rem(21)}
    height={rem(21)}
    viewBox={`0 0 ${rem(21)} ${rem(20)}`}
    {...props}>
    <Path
      d="M17.484 15.079h-1.562v-1.563a.157.157 0 0 0-.156-.156h-.938a.157.157 0 0 0-.156.156v1.563h-1.563a.157.157 0 0 0-.156.156v.937c0 .086.07.157.156.157h1.563v1.562c0 .086.07.156.156.156h.938c.086 0 .156-.07.156-.156V16.33h1.562c.086 0 .157-.07.157-.157v-.937a.157.157 0 0 0-.157-.156ZM7.357 9.735a5.007 5.007 0 0 1 .057-1.424.157.157 0 0 0-.088-.172 2.468 2.468 0 0 1-.72-.49 2.491 2.491 0 0 1-.756-1.863c.017-.627.27-1.223.709-1.672a2.487 2.487 0 0 1 1.82-.756 2.497 2.497 0 0 1 2.078 1.148c.04.06.115.086.182.063.344-.12.707-.203 1.08-.242a.157.157 0 0 0 .123-.227A3.913 3.913 0 0 0 8.41 1.954C6.246 1.92 4.441 3.696 4.441 5.86c0 1.226.565 2.32 1.45 3.037a5.872 5.872 0 0 0-1.69 1.18 5.81 5.81 0 0 0-1.715 3.984.156.156 0 0 0 .157.16h1.095a.156.156 0 0 0 .157-.15 4.415 4.415 0 0 1 1.302-2.998 4.41 4.41 0 0 1 2.045-1.166.16.16 0 0 0 .115-.172Zm8.8-.516a3.908 3.908 0 0 0-3.846-3.906c-2.165-.033-3.967 1.742-3.967 3.906 0 1.227.566 2.32 1.449 3.037-.627.291-1.199.69-1.687 1.18a5.808 5.808 0 0 0-1.715 3.982.156.156 0 0 0 .156.16H7.64a.156.156 0 0 0 .156-.15A4.415 4.415 0 0 1 9.1 14.43a4.423 4.423 0 0 1 3.15-1.305 3.906 3.906 0 0 0 3.906-3.906Zm-2.14 1.768c-.472.472-1.099.732-1.767.732-.668 0-1.295-.26-1.768-.732a2.486 2.486 0 0 1-.732-1.793 2.504 2.504 0 0 1 2.475-2.475 2.514 2.514 0 0 1 1.777.715c.484.475.75 1.11.75 1.785a2.492 2.492 0 0 1-.734 1.768Z"
      fill={props.fill ?? COLORS.primaryDark}
    />
  </Svg>
);
