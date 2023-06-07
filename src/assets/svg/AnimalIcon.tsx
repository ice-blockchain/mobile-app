// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const AnimalIcon = (props: SvgProps) => (
  <Svg
    width={rem(20)}
    height={rem(20)}
    fill="none"
    viewBox="0 0 20 20"
    {...props}>
    <Path
      d="M14.9542 11.8975C14.6551 10.8132 14.0085 9.85693 13.1136 9.17547C12.2187 8.49401 11.1249 8.12497 10.0001 8.12497C8.87527 8.12497 7.78151 8.49401 6.88661 9.17547C5.99172 9.85693 5.34511 10.8132 5.04599 11.8975L4.33318 14.4815C4.2052 14.9454 4.1861 15.4327 4.27738 15.9052C4.36867 16.3778 4.56786 16.8228 4.85944 17.2057C5.15101 17.5886 5.52709 17.899 5.95834 18.1127C6.38959 18.3263 6.86436 18.4375 7.34564 18.4375H12.6545C13.1358 18.4375 13.6106 18.3263 14.0419 18.1127C14.4731 17.899 14.8492 17.5886 15.1407 17.2057C15.4323 16.8228 15.6315 16.3778 15.7228 15.9052C15.8141 15.4327 15.795 14.9454 15.667 14.4815L14.9542 11.8975ZM14.1463 16.4483C13.9721 16.6789 13.7466 16.8657 13.4877 16.994C13.2288 17.1223 12.9435 17.1886 12.6545 17.1875H7.34564C7.05687 17.1875 6.772 17.1208 6.51324 16.9926C6.25449 16.8644 6.02884 16.6782 5.85389 16.4484C5.67894 16.2187 5.55942 15.9516 5.50465 15.6681C5.44989 15.3846 5.46135 15.0922 5.53814 14.8139L6.25095 12.2299C6.47732 11.4093 6.96666 10.6857 7.64389 10.17C8.32113 9.65426 9.14886 9.37498 10.0001 9.37498C10.8513 9.37498 11.6791 9.65426 12.3563 10.17C13.0335 10.6857 13.5229 11.4093 13.7492 12.2299L14.462 14.8139C14.5399 15.0921 14.552 15.3847 14.4972 15.6684C14.4424 15.9521 14.3222 16.2192 14.1463 16.4484V16.4483ZM5.70712 8.99648C5.81588 8.31679 5.67166 7.58917 5.30087 6.94714C4.93009 6.30511 4.37197 5.8164 3.72912 5.57073C3.04068 5.3078 2.33849 5.34968 1.75123 5.68859C0.583765 6.36265 0.276539 8.02394 1.0665 9.39191C1.43716 10.0339 1.99533 10.5228 2.63818 10.7683C2.92295 10.8793 3.22564 10.9372 3.53127 10.9391C3.91202 10.9404 4.28634 10.8408 4.61607 10.6504C5.20298 10.3115 5.59048 9.72409 5.70712 8.99648ZM4.47275 8.7989C4.41689 9.14769 4.2458 9.42077 3.99099 9.56788C3.73619 9.71499 3.41416 9.72655 3.08408 9.60058C2.70857 9.45718 2.37646 9.16109 2.14888 8.76691C1.71138 8.00909 1.81537 7.09503 2.37623 6.77112C2.51722 6.69111 2.6769 6.6499 2.839 6.65167C2.99106 6.65324 3.14155 6.68259 3.28306 6.73827C3.65857 6.88175 3.99068 7.1778 4.21826 7.57198C4.44584 7.96616 4.53619 8.40198 4.47275 8.7989ZM5.84251 6.40691C6.28634 6.76171 6.79318 6.94648 7.30572 6.94644C7.45924 6.94639 7.61232 6.92987 7.76232 6.89718C9.07962 6.61081 9.87834 5.12206 9.54279 3.57851C9.38537 2.85405 9.00263 2.21847 8.46513 1.78874C7.88955 1.32858 7.20775 1.15441 6.54533 1.29847C5.22806 1.5848 4.42935 3.07355 4.76486 4.6171C4.92232 5.34159 5.30505 5.97718 5.84251 6.40691ZM6.8108 2.51995C6.87154 2.50686 6.9335 2.50031 6.99564 2.50042C7.22798 2.50042 7.46697 2.59132 7.68459 2.7653C7.99853 3.01628 8.22466 3.39944 8.3213 3.84425C8.50724 4.69952 8.12966 5.53831 7.49681 5.67589C7.20927 5.73839 6.89896 5.65136 6.6231 5.43077C6.30916 5.17976 6.08302 4.79659 5.98638 4.35183C5.80041 3.49632 6.17798 2.65753 6.8108 2.51995ZM18.249 5.68859C17.6619 5.34968 16.9594 5.3078 16.2711 5.57073C15.6282 5.81632 15.0701 6.30511 14.6994 6.94714C14.3287 7.58917 14.1845 8.31694 14.2931 8.99648C14.4096 9.72409 14.797 10.3115 15.3842 10.6504C15.7139 10.8409 16.0882 10.9405 16.469 10.9391C16.7746 10.9372 17.0773 10.8793 17.3621 10.7683C18.0049 10.5228 18.5631 10.0339 18.9338 9.39191C19.7236 8.02394 19.4164 6.36265 18.249 5.68859ZM17.8513 8.76691C17.6237 9.16109 17.2916 9.45718 16.9161 9.60058C16.5862 9.72667 16.2641 9.71507 16.0093 9.56788C15.7545 9.4207 15.5835 9.14769 15.5275 8.7989C15.464 8.40198 15.5543 7.96632 15.7819 7.57234C16.0095 7.17835 16.3416 6.8821 16.7171 6.73862C16.8586 6.6829 17.0091 6.65349 17.1612 6.65187C17.3233 6.65009 17.483 6.69131 17.624 6.77132C18.1848 7.09495 18.2889 8.0089 17.8513 8.76691ZM12.2379 6.89718C12.3879 6.92987 12.5409 6.94639 12.6945 6.94644C13.207 6.94644 13.714 6.76171 14.1577 6.40691C14.6951 5.97722 15.0779 5.34159 15.2353 4.61714C15.5708 3.07358 14.7721 1.58483 13.4549 1.29851C12.7925 1.15452 12.1106 1.32858 11.5351 1.78878C10.9976 2.21847 10.6148 2.85409 10.4574 3.57851C10.1219 5.12206 10.9206 6.61081 12.2379 6.89718ZM11.6789 3.84405C11.7755 3.39925 12.0017 3.01593 12.3156 2.76511C12.5333 2.59112 12.7722 2.50023 13.0045 2.50023C13.0667 2.50011 13.1287 2.50666 13.1894 2.51976C13.8222 2.65733 14.1998 3.49632 14.0139 4.3514C13.9172 4.7962 13.691 5.17952 13.3772 5.43038C13.1013 5.65093 12.7912 5.73796 12.5035 5.6755C11.8705 5.53812 11.4929 4.69921 11.6789 3.84405Z"
      fill={props.color ?? COLORS.secondary}
      stroke={props.color ?? COLORS.secondary}
      strokeWidth={props.strokeWidth ?? 0.2}
    />
  </Svg>
);
