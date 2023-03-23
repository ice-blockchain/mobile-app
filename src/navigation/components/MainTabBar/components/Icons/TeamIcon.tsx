// SPDX-License-Identifier: ice License 1.0

import {TeamActiveIcon} from '@svg/TeamActiveIcon';
import {TeamInactiveIcon} from '@svg/TeamInactiveIcon';
import React from 'react';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

const ICON_SIZE = rem(40);

export const TeamIcon = ({focused}: Props) => {
  return focused ? (
    <TeamActiveIcon width={ICON_SIZE} height={ICON_SIZE} />
  ) : (
    <TeamInactiveIcon width={ICON_SIZE} height={ICON_SIZE} />
  );
};
