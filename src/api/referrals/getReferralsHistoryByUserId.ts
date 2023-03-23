// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {ReferralHistoryRecord} from '@api/referrals/types';

interface Params {
  userId: string;
  days?: number; // Default is 5
  tz: string;
}

/**
 * Returns the history of referral acquisition for the provided user id.
 */
export function getReferralsHistoryByUserId({userId, tz, days}: Params) {
  return get<ReferralHistoryRecord[]>(
    `/users/${userId}/referral-acquisition-history`,
    {
      days,
      tz,
    },
  );
}
