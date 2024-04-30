// SPDX-License-Identifier: ice License 1.0

import {getReferrals} from './getReferrals';
import {getReferralsHistoryByUserId} from './getReferralsHistoryByUserId';

export const referrals = Object.freeze({
  getReferralsHistoryByUserId,
  getReferrals,
});
