// SPDX-License-Identifier: BUSL-1.1

import {all, takeLatest} from 'redux-saga/effects';

import {ReferralsActions} from '../actions';
import {getReferralsSaga} from './getReferralsSaga';

export function* rootReferralsSaga() {
  yield all([
    takeLatest(ReferralsActions.GET_REFERRALS.START.type, getReferralsSaga),
  ]);
}
