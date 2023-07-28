// SPDX-License-Identifier: ice License 1.0

import {rateApp} from '@services/rateApp';
import {
  AnalyticsEventLogger,
  EVENT_NAMES,
} from '@store/modules/Analytics/constants';
import {RateAppActions} from '@store/modules/RateApp/actions';
import {call, delay, put, SagaReturnType} from 'redux-saga/effects';

export function* showRateAppSaga() {
  try {
    /** There was a delay in previous library 3 sec before showing
     * the rate view so I just kept behavior the same
     */
    yield delay(3000);
    const rateAppResult: SagaReturnType<typeof rateApp> = yield call(rateApp);

    if (rateAppResult) {
      yield put(RateAppActions.SHOW_RATE_APP.SUCCESS.create());
      yield call(AnalyticsEventLogger.trackEvent, {
        eventName: EVENT_NAMES.RATE,
      });
    } else {
      yield put(RateAppActions.SHOW_RATE_APP.FAILED.create());
    }
  } catch (error) {
    /**
     * There might be a variety of reasons for errors that we can do nothing about
     * e.g. when the app is installed not from GP / when activity is null / ...
     * So ignoring them (do not throw the error here)
     */
    yield put(RateAppActions.SHOW_RATE_APP.FAILED.create());
  }
}
