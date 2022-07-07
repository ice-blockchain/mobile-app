// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {Referrals, ReferralType} from '@api/referrals/types';

interface Params {
  userId: string;
  type: ReferralType;
  limit?: number;
  offset?: number;
}

/**
 * Returns the referrals of an user.
 */

export function getReferrals({userId, type}: Params) {
  return get<Referrals>(`/users/${userId}/referrals?type=${type}`);
}
