// SPDX-License-Identifier: BUSL-1.1

import {HomeActiveIcon} from '@svg/TabBar/HomeActiveIcon';
import {HomeInactiveIcon} from '@svg/TabBar/HomeInactiveIcon';
import React from 'react';

type Props = {
  focused: boolean;
};

export const HomeIcon = ({focused}: Props) => {
  return focused ? <HomeActiveIcon /> : <HomeInactiveIcon />;
};
