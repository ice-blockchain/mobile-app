// SPDX-License-Identifier: BUSL-1.1

import {getReferrals} from './getReferrals';
import {getReferralsHistoryByUserId} from './getReferralsHistoryByUserId';

export const referrals = Object.freeze({
  getReferralsHistoryByUserId,
  getReferrals,
});
