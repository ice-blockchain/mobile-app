// SPDX-License-Identifier: ice License 1.0

import {RateAppActions} from '@store/modules/RateApp/actions';
import {checkRateAppConditionSaga} from '@store/modules/RateApp/sagas/checkRateAppConditionSaga';
import {showRateAppSaga} from '@store/modules/RateApp/sagas/showRateAppSaga';
import {all, fork, takeLeading} from 'redux-saga/effects';

export function* rootRateAppSaga() {
  yield all([
    takeLeading(RateAppActions.SHOW_RATE_APP.START.type, showRateAppSaga),

    fork(checkRateAppConditionSaga),
  ]);
}
