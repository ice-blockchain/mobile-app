// SPDX-License-Identifier: ice License 1.0

import {ReferralType} from '@api/user/types';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/rootReducer';

interface ReferralSelectorOptions {
  referralType: ReferralType;
}

const referralsSelectorWithMemo = createSelector(
  [
    (state: RootState) => state.referrals,
    (_state: RootState, {referralType}: ReferralSelectorOptions) =>
      referralType,
  ],
  (referrals, referralType) => {
    const referralData = referrals.data[referralType];
    return {
      data: referralData?.referrals ?? [],
      hasNext:
        !referralData || referralData.total > referralData.referrals.length,
      pageNumber: referralData?.pageNumber ?? 0,
      total: referralData?.total,
      active: referralData?.active,
    };
  },
);

export const referralsSelector =
  (options: ReferralSelectorOptions) => (state: RootState) =>
    referralsSelectorWithMemo(state, options);

export const getReferralUserSelector =
  ({userId}: {userId: string}) =>
  (state: RootState) =>
    state.referrals.users[userId];

export const referralHistorySelector = (state: RootState) =>
  state.referrals.history;

export const userReferralCountSelector = (state: RootState) =>
  (state.account.user?.t1ReferralCount || 0) +
  (state.account.user?.t2ReferralCount || 0);

export const userT1ReferralSelector = (state: RootState) =>
  state.account.user?.t1ReferralCount || 0;

export const userT2ReferralSelector = (state: RootState) =>
  state.account.user?.t2ReferralCount || 0;
