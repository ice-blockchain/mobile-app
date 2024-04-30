// SPDX-License-Identifier: ice License 1.0

import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getReferralsHistorySaga} from '@store/modules/Referrals/sagas/getReferralsHistorySaga';
import {getReferralsSaga} from '@store/modules/Referrals/sagas/getReferralsSaga';
import {pingReferralSaga} from '@store/modules/Referrals/sagas/pingReferralSaga';
import {pingReferralsSaga} from '@store/modules/Referrals/sagas/pingReferralsSaga';
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
  takeLatest(ReferralsActions.PING_REFERRALS.START.type, pingReferralsSaga),
  takeLeadingEveryUnique(
    ReferralsActions.PING_REFERRAL(null).START.type,
    pingReferralSaga,
  ),
];
