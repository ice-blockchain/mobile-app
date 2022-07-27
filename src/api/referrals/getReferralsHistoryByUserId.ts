// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';

interface Params {
  userId: string;
  days?: number; // Default is 5
}

/**
 * Returns the history of referral acquisition for the provided user id.
 */

export function getReferralsHistoryByUserId({userId}: Params) {
  return get<{
    date: string;
    t1: number;
    t2: number;
  }>(`/users/${userId}/referral-acquisition-history`);
}
