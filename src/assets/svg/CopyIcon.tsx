// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const CopyIcon = (props: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    fill="none"
    viewBox="0 0 20 20"
    {...props}>
    <Path
      d="M7.30151 3.65078V13.1746C7.30151 13.5956 7.46875 13.9993 7.76642 14.297C8.0641 14.5947 8.46784 14.7619 8.88882 14.7619H15.238C15.659 14.7619 16.0627 14.5947 16.3604 14.297C16.6581 13.9993 16.8253 13.5956 16.8253 13.1746V6.22379C16.8253 6.01233 16.783 5.80301 16.701 5.60812C16.6189 5.41322 16.4988 5.23668 16.3475 5.08887L13.7166 2.51586C13.4201 2.2259 13.0218 2.06353 12.6071 2.06348H8.88882C8.46784 2.06348 8.0641 2.23071 7.76642 2.52839C7.46875 2.82606 7.30151 3.2298 7.30151 3.65078V3.65078Z"
      stroke={props.color ?? COLORS.primaryDark}
      strokeWidth={props.strokeWidth ?? 1.5}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
    <Path
      d="M13.6508 14.7619V16.3492C13.6508 16.7702 13.4835 17.1739 13.1859 17.4716C12.8882 17.7693 12.4844 17.9365 12.0635 17.9365H5.71425C5.29328 17.9365 4.88954 17.7693 4.59186 17.4716C4.29419 17.1739 4.12695 16.7702 4.12695 16.3492V7.61904C4.12695 7.19806 4.29419 6.79432 4.59186 6.49665C4.88954 6.19897 5.29328 6.03174 5.71425 6.03174H7.30156"
      stroke={props.color ?? COLORS.primaryDark}
      strokeWidth={props.strokeWidth ?? 1.5}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
  </Svg>
);
