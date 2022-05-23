// SPDX-License-Identifier: BUSL-1.1

import getReferrals from './getReferrals';
import getReferralsHistoryByUserId from './getReferralsHistoryByUserId';

const referrals = Object.freeze({
  getReferralsHistoryByUserId,
  getReferrals,
});

export default referrals;
