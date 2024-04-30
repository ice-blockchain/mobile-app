// SPDX-License-Identifier: ice License 1.0

import {HomeActiveIcon} from '@svg/HomeActiveIcon';
import {HomeInactiveIcon} from '@svg/HomeInactiveIcon';
import React from 'react';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

const ICON_SIZE = rem(40);

export const HomeIcon = ({focused}: Props) => {
  return focused ? (
    <HomeActiveIcon width={ICON_SIZE} height={ICON_SIZE} />
  ) : (
    <HomeInactiveIcon width={ICON_SIZE} height={ICON_SIZE} />
  );
};
