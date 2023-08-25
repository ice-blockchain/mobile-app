// SPDX-License-Identifier: ice License 1.0

import {ReferralType, User} from '@api/user/types';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/rootReducer';

export const MAX_PINGED_REFS = 4;
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
    const {referralType, userId} = options;
    const referralData = referrals.data[referralType];
    let refUsers = (referralData?.referrals ?? []).map(
      referralId => referrals.users[referralId],
    );

    /**
     * Slice the array to start from the user that is being pinged
     */
    const index = refUsers.findIndex(user => user.id === userId);
    refUsers = refUsers.slice(index, refUsers.length);

    /**
     * Filter the refs to show
     */
    const filtered = filterPingedRefsToShow(refUsers);
    return {
      data: filtered.map(user => user.id),
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

function filterPingedRefsToShow(refs: User[]) {
  const allPinged = refs.findIndex(user => !user.pinged) === -1;
  const allNotPinged = refs.findIndex(user => user.pinged) === -1;
  const lowAmount = refs.length <= MAX_PINGED_REFS;

  let firstFalseIndex = -1;

  for (let i = 0; i < refs.length; i++) {
    if (!refs[i].pinged) {
      firstFalseIndex = i;
      break;
    }
  }

  /**
   * If all refs are pinged, show the last 4
   */
  if (allPinged && refs.length > MAX_PINGED_REFS) {
    return refs.splice(refs.length - MAX_PINGED_REFS, refs.length);
  } else if (allNotPinged || lowAmount || firstFalseIndex < MAX_PINGED_REFS) {
    /**
     * If all refs are not pinged
     * OR
     * If there are less than MAX_PINGED_REFS refs
     * OR
     * There are less than MAX_PINGED_REFS pinged
     */
    return refs;
  } else {
    /**
     * If there are more than MAX_PINGED_REFS pinged
     */
    return refs.slice(firstFalseIndex - (MAX_PINGED_REFS - 1), refs.length);
  }
}
