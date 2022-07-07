// SPDX-License-Identifier: BUSL-1.1

import {UserProfile} from '@api/user/types';

export type ReferralType = 'CONTACTS' | 'T1' | 'T2';

export interface Referral extends UserProfile {
  active: boolean;
  pingAllowed: boolean;
}

export interface RelatableUserProfile extends Referral {
  referralType: ReferralType;
}

export interface Referrals {
  active: number;
  referrals: [Referral];
  total: number;
}

export interface ReferralAcquisition {
  date: string;
  t1: number;
  t2: number;
}
