// SPDX-License-Identifier: BUSL-1.1

export type ReferralType = 'CONTACTS' | 'T1' | 'T2';

export interface Referral {
  active: boolean;
  city: string | null;
  country: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  phoneNumber: string | null;
  pingAllowed: boolean;
  profilePictureURL: string | null;
  username: string | null;
}

export interface Referrals {
  active: boolean;
  referrals: [Referral];
  total: number;
}

export interface ReferralAcquisition {
  date: string;
  t1: number;
  t2: number;
}
