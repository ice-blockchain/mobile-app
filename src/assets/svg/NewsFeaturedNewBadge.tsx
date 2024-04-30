// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
  SvgProps,
} from 'react-native-svg';
import {rem} from 'rn-units';

export const NewsFeaturedNewBadge = (props: SvgProps) => (
  <Svg
    width={rem(28)}
    height={rem(18)}
    viewBox={'0 0 28 18'}
    fill={'none'}
    {...props}>
    <Rect width={28} height={18} rx={9} fill={'url(#a)'} />
    <Path
      d={
        'M9.934 6.216V12h-.552a.52.52 0 0 1-.216-.04.534.534 0 0 1-.164-.144L5.982 7.96c.016.176.024.339.024.488V12h-.948V6.216h.564c.045 0 .084.003.116.008.035.003.064.01.088.024.027.01.052.028.076.052.024.021.05.05.08.088l3.032 3.872a10.354 10.354 0 0 1-.02-.276 4.315 4.315 0 0 1-.008-.252V6.216h.948Zm2.368.856v1.604h2.024v.828h-2.024v1.636h2.568V12h-3.648V6.216h3.648v.856h-2.568Zm11.218-.856L21.724 12h-.972l-1.264-3.952a2.685 2.685 0 0 1-.096-.352c-.016.067-.032.13-.048.188a1.976 1.976 0 0 1-.052.164L18.016 12h-.976l-1.792-5.784h.9a.38.38 0 0 1 .232.068.306.306 0 0 1 .128.176l.984 3.46c.021.085.041.179.06.28l.064.312a6.4 6.4 0 0 1 .068-.316 4.34 4.34 0 0 1 .084-.276l1.136-3.46a.383.383 0 0 1 .124-.168.362.362 0 0 1 .232-.076h.316a.362.362 0 0 1 .36.244l1.132 3.46c.056.165.106.356.152.572.034-.21.073-.401.116-.572l.984-3.46a.302.302 0 0 1 .12-.172.393.393 0 0 1 .236-.072h.844Z'
      }
      fill={'#fff'}
    />
    <Defs>
      <LinearGradient
        id={'a'}
        x1={14.107}
        y1={0.043}
        x2={14.107}
        y2={17.211}
        gradientUnits={'userSpaceOnUse'}>
        <Stop stopColor={COLORS.koromiko} />
        <Stop offset={1} stopColor={COLORS.neonCarrot} />
      </LinearGradient>
    </Defs>
  </Svg>
);
