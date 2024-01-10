// SPDX-License-Identifier: ice License 1.0

import {TaskType} from '@api/tasks/types';
import {COLORS} from '@constants/colors';
import {InviteIcon} from '@svg/InviteIcon';
import {LogoIcon} from '@svg/LogoIcon';
import {TelegramIcon} from '@svg/Telegram';
import {TwitterIcon} from '@svg/TwitterIcon';
import {UserCircleIcon} from '@svg/UserCircle';
import {VerifiedUserIcon} from '@svg/VerifiedUser';
import React from 'react';
import {rem} from 'rn-units';

export type TaskInfo = {
  icon: JSX.Element;
  iconBgColor: string;
  activeBgColor?: string;
};

export const TASKS: {[key in TaskType]: TaskInfo} = {
  claim_username: {
    iconBgColor: COLORS.dodgerBlue,
    icon: <VerifiedUserIcon />,
  },
  start_mining: {
    iconBgColor: COLORS.downriver,
    icon: <LogoIcon color={COLORS.white} width={rem(24)} height={rem(24)} />,
  },
  upload_profile_picture: {
    iconBgColor: COLORS.primaryLight,
    activeBgColor: COLORS.gullGray,
    icon: <UserCircleIcon />,
  },
  follow_us_on_twitter: {
    iconBgColor: COLORS.toreaBay,
    icon: <TwitterIcon color={COLORS.white} />,
  },
  join_telegram: {
    iconBgColor: COLORS.royalBlue,
    icon: <TelegramIcon />,
  },
  invite_friends: {
    iconBgColor: COLORS.blueViolet,
    icon: <InviteIcon fill={COLORS.white} width={rem(21)} height={rem(20)} />,
  },
};
