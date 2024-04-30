// SPDX-License-Identifier: ice License 1.0

import {EVENT_NAMES} from '@store/modules/Analytics/constants';

export type UserAttributes = {
  firstName?: string | null;
  lastName?: string | null;
  username?: string;
  email?: string | null;
  phoneNumber?: string | null;
  city?: string | null;
  country?: string | null;
  referralsCount?: number | null;
  t1ReferralCount?: number | null;
  t2ReferralCount?: number | null;

  registrationDate?: string;
  profilePicture?: string;
};

export type DeviceAttributes = {
  language?: string;
  os?: string;
  device?: string;
  timezone?: string;
};

export type MiningAttributes = {
  miningStreak?: number;
  remainingDaysOff?: number;
};

export type PreStakingAttributes = {
  preStakingAllocation?: number;
  preStakingPeriod?: number;
};

export type ResurrectResponseType = 'accepted' | 'denied' | 'NULL';

type Keys = keyof typeof EVENT_NAMES;
export type EventNamesType = typeof EVENT_NAMES[Keys];
export type TapToMineActionType = 'Default' | 'Extended' | 'Info';
export type ClaimBonusResult = 'Success' | 'Expired';
