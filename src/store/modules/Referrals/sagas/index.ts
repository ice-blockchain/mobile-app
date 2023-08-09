// SPDX-License-Identifier: ice License 1.0

import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getReferralsHistorySaga} from '@store/modules/Referrals/sagas/getReferralsHistorySaga';
import {getReferralsSaga} from '@store/modules/Referrals/sagas/getReferralsSaga';
import {pingFriendsSaga} from '@store/modules/Referrals/sagas/pingFriendsSaga';
import {pingReferralSaga} from '@store/modules/Referrals/sagas/pingReferralSaga';
import {takeLeadingEveryUnique} from '@store/utils/sagas/effects';
import {takeLatest, takeLeading} from 'redux-saga/effects';

export const referralsWatchers = [
  takeLeadingEveryUnique(
    ReferralsActions.GET_REFERRALS({})(null).START.type,
    getReferralsSaga,
  ),
  takeLeading(
    ReferralsActions.GET_REFERRALS_HISTORY.START.type,
    getReferralsHistorySaga,
  ),
  takeLatest(ReferralsActions.PING_FRIENDS.START.type, pingFriendsSaga),
  takeLeadingEveryUnique(
    ReferralsActions.PING_REFERRAL(null).START.type,
    pingReferralSaga,
  ),
];
