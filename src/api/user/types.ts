// SPDX-License-Identifier: BUSL-1.1

import {ReferralType} from '@api/referrals/types';

export interface UserProfile {
  city: string | null;
  country: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  phoneNumber: string | null;
  profilePictureURL: string | null;
  referralCount: number;
  username: string | null;
}

export interface RelatableUserProfile {
  active: boolean;
  city: string | null;
  country: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  phoneNumber: string | null;
  pingAllowed: boolean;
  profilePictureURL: string | null;
  referralType: ReferralType;
  username: string | null;
}
