// SPDX-License-Identifier: BUSL-1.1

import {TeamActiveIcon} from '@svg/TeamActiveIcon';
import {TeamInactiveIcon} from '@svg/TeamInactiveIcon';
import React from 'react';

type Props = {
  focused: boolean;
};

export const TeamIcon = ({focused}: Props) => {
  return focused ? <TeamActiveIcon /> : <TeamInactiveIcon />;
};
