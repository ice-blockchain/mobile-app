// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {StatsIcon} from '@svg/StatsIcon';
import React from 'react';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

const STATS_ICON_SIZE = rem(27);

export const StatsTabIcon = ({focused}: Props) => {
  return focused ? (
    <StatsIcon
      color={COLORS.primaryLight}
      width={STATS_ICON_SIZE}
      height={STATS_ICON_SIZE}
    />
  ) : (
    <StatsIcon
      color={COLORS.secondary}
      width={STATS_ICON_SIZE}
      height={STATS_ICON_SIZE}
    />
  );
};
