// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {Referrals} from '@api/referrals/types';
import {ReferralType} from '@api/user/types';

interface Params {
  userId: string;
  referralType: ReferralType;
  limit?: number;
  offset?: number;
}

/**
 * Returns the referrals of an user.
 */

export function getReferrals({
  userId,
  referralType,
  limit = 10,
  offset = 0,
}: Params) {
  return get<Referrals>(`/users/${userId}/referrals`, {
    type: referralType,
    limit,
    offset,
  });
}
