// SPDX-License-Identifier: ice License 1.0

import {ReferralType} from '@api/user/types';
import {MAX_PINGED_REFS} from '@constants/referrals';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/rootReducer';
interface ReferralSelectorOptions {
  referralType: ReferralType;
}

interface PingReferralsSelectorOptions {
  referralType: ReferralType;
  userId: string;
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
      nextOffset: referralData?.nextOffset ?? 0,
      total: referralData?.total,
      active: referralData?.active,
    };
  },
);

const referralsToPingSelectorWithMemo = createSelector(
  [
    (state: RootState) => state.referrals,
    (_state: RootState, options: PingReferralsSelectorOptions) => options,
  ],
  (referrals, options) => {
    const {referralType, userId} = options;
    const referralData = referrals.data[referralType];

    let pingedRefIds = (referralData?.referrals ?? []).filter(
      referralId => !referrals.users[referralId].pinged,
    );

    /**
     * Slice the array to start from the user that is being pinged
     */
    const index = pingedRefIds.findIndex(id => id === userId);
    pingedRefIds = pingedRefIds.slice(index, pingedRefIds.length);

    return {
      data: pingedRefIds,
      hasNext:
        !referralData || referralData.total > referralData.referrals.length,
    };
  },
);

const referralsToShowForPingSelectorWithMemo = createSelector(
  [
    (state: RootState) => state.referrals,
    (_state: RootState, options: PingReferralsSelectorOptions) => options,
  ],
  (referrals, options) => {
    const referralData = referrals.data[options.referralType];
    const firstNotPingedIndex = referrals.pingSessionUsers.findIndex(
      userId => !referrals.users[userId].pinged,
    );

    const refs = referrals.pingSessionUsers.slice(
      Math.max(0, firstNotPingedIndex - (MAX_PINGED_REFS - 1)),
      Math.max(MAX_PINGED_REFS, firstNotPingedIndex + 1),
    );

    return {
      data: refs,
      hasNext:
        !referralData || referralData.total > referralData.referrals.length,
    };
  },
);

export const referralsSelector =
  (options: ReferralSelectorOptions) => (state: RootState) =>
    referralsSelectorWithMemo(state, options);

export const referralsToPingSelector =
  (options: PingReferralsSelectorOptions) => (state: RootState) =>
    referralsToPingSelectorWithMemo(state, options);

export const referralsToShowForPingSelector =
  (options: PingReferralsSelectorOptions) => (state: RootState) =>
    referralsToShowForPingSelectorWithMemo(state, options);

export const getReferralUserSelector =
  ({userId}: {userId: string}) =>
  (state: RootState) =>
    state.referrals.users[userId];

export const referralHistorySelector = (state: RootState) =>
  state.referrals.history;

export const pingSessionUsersSelector = (state: RootState) =>
  state.referrals.pingSessionUsers;

export const userReferralCountSelector = (state: RootState) =>
  (state.account.user?.t1ReferralCount || 0) +
  (state.account.user?.t2ReferralCount || 0);

export const userT1ReferralSelector = (state: RootState) =>
  state.account.user?.t1ReferralCount || 0;

export const userT2ReferralSelector = (state: RootState) =>
  state.account.user?.t2ReferralCount || 0;

export const pingCounterSelector = (state: RootState) =>
  state.referrals.pingCounter;

export const pingSessionUserIdSelector = (state: RootState) =>
  state.referrals.pingSessionUserId;
