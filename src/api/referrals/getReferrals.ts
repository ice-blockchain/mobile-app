// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {User} from '@api/user/types';

interface Params {
  userId: string;
  type: User['referralType'];
  limit?: number;
  offset?: number;
}

/**
 * Returns the referrals of an user.
 */

export function getReferrals({userId, type}: Params) {
  return get<{
    active: number;
    referrals: User[];
    total: number;
  }>(`/users/${userId}/referrals?type=${type}`);
}
