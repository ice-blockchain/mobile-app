// SPDX-License-Identifier: BUSL-1.1

import {ReferralsActions} from '@store/modules/Referrals/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {getReferralsSaga} from './getReferralsSaga';

export function* rootReferralsSaga() {
  yield all([
    takeLatest(ReferralsActions.GET_REFERRALS.START.type, getReferralsSaga),
  ]);
}
