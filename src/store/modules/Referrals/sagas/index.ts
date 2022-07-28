// SPDX-License-Identifier: BUSL-1.1

import {all, fork} from 'redux-saga/effects';

import {watchGetReferrals} from './getReferralsSaga';

export function* rootReferralsSaga() {
  yield all([fork(watchGetReferrals)]);
}
