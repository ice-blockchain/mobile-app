// SPDX-License-Identifier: ice License 1.0

import {TaskType} from '@api/tasks/types';
import {COLORS} from '@constants/colors';
import {InviteIcon} from '@svg/InviteIcon';
import {LogoIcon} from '@svg/LogoIcon';
import {TelegramSvg} from '@svg/Telegram';
import {TwitterIcon} from '@svg/TwitterIcon';
import {UserCircleSvg} from '@svg/UserCircle';
import {VerifiedUserSvg} from '@svg/VerifiedUser';
import React from 'react';

export type TaskInfo = {
  icon: JSX.Element;
  iconBgColor: string;
  activeBgColor?: string;
};

export const TASKS: {[key in TaskType]: TaskInfo} = {
  claim_username: {
    iconBgColor: COLORS.dodgerBlue,
    icon: <VerifiedUserSvg />,
  },
  start_mining: {
    iconBgColor: COLORS.downriver,
    icon: <LogoIcon color={COLORS.white} width={24} height={24} />,
  },
  upload_profile_picture: {
    iconBgColor: COLORS.primaryLight,
    activeBgColor: COLORS.gullGray,
    icon: <UserCircleSvg />,
  },
  follow_us_on_twitter: {
    iconBgColor: COLORS.toreaBay,
    icon: <TwitterIcon width={20} height={20} fill={COLORS.white} />,
  },
  join_telegram: {
    iconBgColor: COLORS.royalBlue,
    icon: <TelegramSvg />,
  },
  invite_friends: {
    iconBgColor: COLORS.blueViolet,
    icon: <InviteIcon fill={COLORS.white} width={21} height={20} />,
  },
};
