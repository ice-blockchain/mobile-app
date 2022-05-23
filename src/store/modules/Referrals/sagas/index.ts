// SPDX-License-Identifier: BUSL-1.1

import {all, takeLatest} from 'redux-saga/effects';
import getReferralsSaga from './getReferralsSaga';
import ReferralsActions from '../actions';

export default function* rootSaga() {
  yield all([
    takeLatest(ReferralsActions.GET_REFERRALS.START.type, getReferralsSaga),
  ]);
}
