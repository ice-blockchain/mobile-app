// SPDX-License-Identifier: BUSL-1.1

import {ReferralsActions} from '@store/modules/Referrals/actions';
import {all, takeEvery} from 'redux-saga/effects';

import {getReferralsSaga} from './getReferralsSaga';

export function* rootReferralsSaga() {
  yield all([
    // tkeLeading for each type
    takeEvery(ReferralsActions.GET_REFERRALS.START.type, getReferralsSaga),
  ]);
}
