// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {ReferralType, User} from '@api/user/types';

interface Params {
  userId: string;
  referralType: ReferralType;
  limit?: number;
  offset?: number;
}

/**
 * Returns the referrals of an user.
 */

export function getReferrals({userId, referralType}: Params) {
  return get<{
    active: number;
    referrals: User[];
    total: number;
  }>(`/users/${userId}/referrals?type=${referralType}`);
}
