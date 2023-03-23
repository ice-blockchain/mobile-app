// SPDX-License-Identifier: ice License 1.0

import {rateApp} from '@services/rateApp';
import {RateAppActions} from '@store/modules/RateApp/actions';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* showRateAppSaga() {
  try {
    const rateAppResult: SagaReturnType<typeof rateApp> = yield call(rateApp);

    if (rateAppResult) {
      yield put(RateAppActions.SHOW_RATE_APP.SUCCESS.create());
    } else {
      yield put(RateAppActions.SHOW_RATE_APP.FAILED.create());
    }
  } catch (error) {
    yield put(RateAppActions.SHOW_RATE_APP.FAILED.create());

    throw error;
  }
}
