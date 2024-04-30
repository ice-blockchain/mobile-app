// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from 'react-native-svg';
import {rem} from 'rn-units';

export const NewsNewBadge = (props: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(28)}
    viewBox={'0 0 24 28'}
    fill={'none'}
    {...props}>
    <Path
      d={
        'M0 3a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v21.5c0 2.14-2.178 3.593-4.154 2.77l-6.692-2.79a3 3 0 0 0-2.308 0l-6.692 2.79C2.178 28.092 0 26.64 0 24.5V3Z'
      }
      fill={'url(#a)'}
    />
    <Path
      d={
        'M7.934 10.216V16h-.552a.52.52 0 0 1-.216-.04.534.534 0 0 1-.164-.144l-3.02-3.856c.016.176.024.339.024.488V16h-.948v-5.784h.564c.045 0 .084.003.116.008.035.003.064.01.088.024.027.01.052.028.076.052.024.021.05.05.08.088l3.032 3.872a10.354 10.354 0 0 1-.02-.276 4.316 4.316 0 0 1-.008-.252v-3.516h.948Zm2.368.856v1.604h2.024v.828h-2.024v1.636h2.568V16H9.222v-5.784h3.648v.856h-2.568Zm11.218-.856L19.724 16h-.972l-1.264-3.952a2.683 2.683 0 0 1-.096-.352c-.016.067-.032.13-.048.188a1.976 1.976 0 0 1-.052.164L16.016 16h-.976l-1.792-5.784h.9a.38.38 0 0 1 .232.068.306.306 0 0 1 .128.176l.984 3.46c.021.085.041.179.06.28l.064.312a6.4 6.4 0 0 1 .068-.316 4.34 4.34 0 0 1 .084-.276l1.136-3.46a.384.384 0 0 1 .124-.168.362.362 0 0 1 .232-.076h.316a.363.363 0 0 1 .36.244l1.132 3.46c.056.165.106.356.152.572.034-.21.073-.401.116-.572l.984-3.46a.302.302 0 0 1 .12-.172.393.393 0 0 1 .236-.072h.844Z'
      }
      fill={'#fff'}
    />
    <Defs>
      <LinearGradient
        id={'a'}
        x1={12.092}
        y1={0.069}
        x2={12.092}
        y2={27.729}
        gradientUnits={'userSpaceOnUse'}>
        <Stop stopColor={COLORS.koromiko} />
        <Stop offset={1} stopColor={COLORS.neonCarrot} />
      </LinearGradient>
    </Defs>
  </Svg>
);
