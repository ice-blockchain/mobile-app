// SPDX-License-Identifier: BUSL-1.1

import {HomeActiveIcon} from '@svg/HomeActiveIcon';
import {HomeInactiveIcon} from '@svg/HomeInactiveIcon';
import React from 'react';

type Props = {
  focused: boolean;
};

export const HomeIcon = ({focused}: Props) => {
  return focused ? <HomeActiveIcon /> : <HomeInactiveIcon />;
};
