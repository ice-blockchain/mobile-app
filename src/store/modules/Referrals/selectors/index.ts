// SPDX-License-Identifier: BUSL-1.1

import {ReferralType} from '@api/user/types';
import {RootState} from '@store/rootReducer';

export const referralsSelector =
  (userId: string, referralType: ReferralType) => (state: RootState) =>
    state.referrals.data[userId]?.[referralType];
