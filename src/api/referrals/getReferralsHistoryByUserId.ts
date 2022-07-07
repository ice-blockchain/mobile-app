// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {ReferralAcquisition} from '@api/referrals/types';

interface Params {
  userId: string;
  days?: number; // Default is 5
}

/**
 * Returns the history of referral acquisition for the provided user id.
 */

export function getReferralsHistoryByUserId({userId}: Params) {
  return get<ReferralAcquisition>(
    `/users/${userId}/referral-acquisition-history`,
  );
}
