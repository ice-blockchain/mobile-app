// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units/index';

export const EyeIcon = ({fill = COLORS.white, ...props}: SvgProps) => {
  return (
    <Svg
      width={rem(14)}
      height={rem(8)}
      viewBox="0 0 14 8"
      fill={fill}
      {...props}>
      <Path
        fill={fill}
        d="M1.63202 4.87867C1.57233 5.04161 1.45146 5.17486 1.29509 5.25011C1.13873 5.32535 0.959179 5.33666 0.794604 5.28163C0.63003 5.2266 0.493399 5.10956 0.413743 4.95539C0.334087 4.80122 0.317683 4.62207 0.368017 4.456C0.354684 4.496 0.368017 4.45467 0.368017 4.45467C0.391727 4.38125 0.419321 4.30915 0.450684 4.23867C0.504017 4.112 0.582684 3.93733 0.690684 3.73067C0.910684 3.31733 1.25335 2.76667 1.75868 2.216C2.77868 1.10267 4.44935 0 7.00002 0C9.55068 0 11.2213 1.10267 12.2414 2.216C12.7858 2.8133 13.2273 3.49681 13.548 4.23867L13.6094 4.38933C13.6133 4.4 13.6267 4.46933 13.64 4.536L13.6667 4.66667C13.6667 4.66667 13.7787 5.11067 13.2107 5.29867C13.0434 5.35453 12.8608 5.34183 12.7029 5.26337C12.5449 5.1849 12.4245 5.04705 12.368 4.88V4.876L12.36 4.85467C12.293 4.68339 12.2165 4.51601 12.1307 4.35333C11.8936 3.90602 11.6006 3.49069 11.2587 3.11733C10.4454 2.23067 9.11602 1.33333 7.00002 1.33333C4.88402 1.33333 3.55468 2.23067 2.74135 3.11733C2.301 3.60009 1.94291 4.15188 1.68135 4.75067C1.66736 4.78508 1.65403 4.81975 1.64135 4.85467L1.63202 4.87867ZM7.00002 2.66667C6.29277 2.66667 5.6145 2.94762 5.1144 3.44772C4.6143 3.94781 4.33335 4.62609 4.33335 5.33333C4.33335 6.04058 4.6143 6.71885 5.1144 7.21895C5.6145 7.71905 6.29277 8 7.00002 8C7.70726 8 8.38554 7.71905 8.88564 7.21895C9.38573 6.71885 9.66668 6.04058 9.66668 5.33333C9.66668 4.62609 9.38573 3.94781 8.88564 3.44772C8.38554 2.94762 7.70726 2.66667 7.00002 2.66667ZM5.66668 5.33333C5.66668 4.97971 5.80716 4.64057 6.05721 4.39052C6.30726 4.14048 6.6464 4 7.00002 4C7.35364 4 7.69278 4.14048 7.94283 4.39052C8.19287 4.64057 8.33335 4.97971 8.33335 5.33333C8.33335 5.68696 8.19287 6.02609 7.94283 6.27614C7.69278 6.52619 7.35364 6.66667 7.00002 6.66667C6.6464 6.66667 6.30726 6.52619 6.05721 6.27614C5.80716 6.02609 5.66668 5.68696 5.66668 5.33333Z"
      />
    </Svg>
  );
};
