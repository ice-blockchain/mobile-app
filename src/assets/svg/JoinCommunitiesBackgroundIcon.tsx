// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const JoinCommunitiesBackgroundIcon = (props: SvgProps) => (
  <Svg
    width={rem(60)}
    height={rem(60)}
    fill="none"
    viewBox="0 0 60 60"
    {...props}>
    <G opacity={0.1}>
      <G clipPath={'url(#clip0_9797_27432)'}>
        <Path
          d="M53.7925 32.4491L55.301 27.0151C57.0619 20.6719 57.9423 17.5003 57.2793 14.7556C56.7558 12.5885 55.5782 10.6198 53.8955 9.09858C51.7644 7.17199 48.4786 6.32217 41.9069 4.62252C35.3351 2.92286 32.0493 2.07304 29.2057 2.71301C26.9604 3.21833 24.9208 4.35494 23.3448 5.97911C21.6359 7.74028 20.7447 10.3185 19.4185 15.0048C19.1958 15.7918 18.9608 16.6382 18.7077 17.5502L18.7075 17.5509L17.199 22.9849C15.4381 29.3281 14.5577 32.4997 15.2207 35.2444C15.7442 37.4115 16.9218 39.3802 18.6045 40.9014C20.7356 42.828 24.0214 43.6778 30.5932 45.3775L30.5932 45.3775C36.5165 46.9095 39.7704 47.751 42.437 47.4335C42.7289 47.3988 43.0138 47.3501 43.2943 47.287C45.5396 46.7817 47.5792 45.6451 49.1552 44.0209C51.1512 41.9639 52.0316 38.7923 53.7925 32.4491L53.7925 32.4491Z"
          stroke={props.color ?? COLORS.white}
          strokeWidth={4.25}
        />
        <Path
          d="M42.5 45.8579C41.9215 47.7053 40.9042 49.3765 39.5363 50.7124C37.5071 52.6941 34.3783 53.5683 28.1207 55.3167C21.8631 57.065 18.7343 57.9392 16.0267 57.2809C13.8887 56.7611 11.9466 55.5919 10.4459 53.9212C8.54534 51.8053 7.70698 48.5428 6.03026 42.0179L4.59388 36.4282C2.91716 29.9032 2.0788 26.6408 2.71014 23.8174C3.20863 21.5882 4.32991 19.5631 5.93217 17.9983C7.9614 16.0165 11.0902 15.1423 17.3478 13.394C18.5317 13.0632 19.6035 12.7637 20.5818 12.5"
          stroke={props.color ?? COLORS.white}
          strokeWidth={4.25}
        />
        <Path
          d="M29.957 23.7991L43.5206 27.4334"
          stroke={props.color ?? COLORS.white}
          strokeWidth={4.25}
          strokeLinecap={'round'}
        />
        <Path
          d="M27.7754 31.9375L35.9136 34.1181"
          stroke={props.color ?? COLORS.white}
          strokeWidth={4.25}
          strokeLinecap={'round'}
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="clip0_9797_27432">
        <Rect
          width={60}
          height={60}
          rx={12.5}
          fill={props.color ?? COLORS.white}
        />
      </ClipPath>
    </Defs>
  </Svg>
);
