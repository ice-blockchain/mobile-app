// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const VerifiedIcon = (props: SvgProps) => (
  <Svg
    width={rem(14)}
    height={rem(14)}
    fill="none"
    viewBox="0 0 14 14"
    {...props}>
    <G clipPath={'url(#clip0_15182_4637)'}>
      <Path
        d="M12.3539 5.62188C12.1461 5.40859 11.9328 5.18438 11.8508 4.99297C11.7688 4.80156 11.7742 4.51719 11.7688 4.22734C11.7633 3.69688 11.7523 3.08984 11.3313 2.66875C10.9102 2.24766 10.3031 2.23672 9.77266 2.23125C9.48281 2.22578 9.1875 2.22031 9.00703 2.14922C8.82656 2.07812 8.59141 1.85391 8.37812 1.64609C8.00078 1.28516 7.56875 0.875 7 0.875C6.43125 0.875 5.99922 1.28516 5.62188 1.64609C5.40859 1.85391 5.18438 2.06719 4.99297 2.14922C4.80156 2.23125 4.51719 2.22578 4.22734 2.23125C3.69688 2.23672 3.08984 2.24766 2.66875 2.66875C2.24766 3.08984 2.23672 3.69688 2.23125 4.22734C2.22578 4.51719 2.22031 4.8125 2.14922 4.99297C2.07812 5.17344 1.85391 5.40859 1.64609 5.62188C1.28516 5.99922 0.875 6.43125 0.875 7C0.875 7.56875 1.28516 8.00078 1.64609 8.37812C1.85391 8.59141 2.06719 8.81562 2.14922 9.00703C2.23125 9.19844 2.22578 9.48281 2.23125 9.77266C2.23672 10.3031 2.24766 10.9102 2.66875 11.3313C3.08984 11.7523 3.69688 11.7633 4.22734 11.7688C4.51719 11.7742 4.8125 11.7797 4.99297 11.8508C5.17344 11.9219 5.40859 12.1461 5.62188 12.3539C5.99922 12.7148 6.43125 13.125 7 13.125C7.56875 13.125 8.00078 12.7148 8.37812 12.3539C8.59141 12.1461 8.81562 11.9328 9.00703 11.8508C9.19844 11.7688 9.48281 11.7742 9.77266 11.7688C10.3031 11.7633 10.9102 11.7523 11.3313 11.3313C11.7523 10.9102 11.7633 10.3031 11.7688 9.77266C11.7742 9.48281 11.7797 9.1875 11.8508 9.00703C11.9219 8.82656 12.1461 8.59141 12.3539 8.37812C12.7148 8.00078 13.125 7.56875 13.125 7C13.125 6.43125 12.7148 5.99922 12.3539 5.62188ZM9.70703 6.00469L6.50234 9.06719C6.41949 9.14512 6.30984 9.1882 6.19609 9.1875C6.08402 9.18793 5.97617 9.14479 5.89531 9.06719L4.29297 7.53594C4.24853 7.49716 4.21238 7.4498 4.18671 7.3967C4.16104 7.3436 4.14637 7.28586 4.14358 7.22695C4.14079 7.16803 4.14994 7.10916 4.17049 7.05387C4.19103 6.99859 4.22254 6.94803 4.26313 6.90523C4.30371 6.86243 4.35253 6.82828 4.40665 6.80483C4.46077 6.78138 4.51907 6.76912 4.57805 6.76878C4.63703 6.76843 4.69547 6.78002 4.74985 6.80284C4.80424 6.82566 4.85345 6.85924 4.89453 6.90156L6.19609 8.14297L9.10547 5.37031C9.19054 5.2961 9.301 5.25763 9.41376 5.26297C9.52653 5.2683 9.63287 5.31702 9.71055 5.39894C9.78823 5.48086 9.83124 5.58963 9.83058 5.70252C9.82993 5.81541 9.78566 5.92368 9.70703 6.00469Z"
        fill={props.color ?? COLORS.dodgerBlue}
      />
    </G>
    <Defs>
      <ClipPath id={'clip0_15182_4637'}>
        <Rect width={rem(14)} height={rem(14)} fill={COLORS.white} />
      </ClipPath>
    </Defs>
  </Svg>
);
