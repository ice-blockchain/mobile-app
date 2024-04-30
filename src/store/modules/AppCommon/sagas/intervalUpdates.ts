// SPDX-License-Identifier: ice License 1.0

import {APP_AUTO_UPDATE_INTERVAL_SEC} from '@constants/timeouts';
import {
  isAuthorizedSelector,
  isRegistrationCompleteSelector,
} from '@store/modules/Account/selectors';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {call, delay, put, select} from 'redux-saga/effects';

export function* intervalUpdatesSaga() {
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );

  const isAppActive: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAppActiveSelector,
  );

  if (isAuthorized && isAppActive) {
    yield call(waitForSelector, isRegistrationCompleteSelector);
    while (true) {
      yield delay(APP_AUTO_UPDATE_INTERVAL_SEC * 1000);
      yield put(AppCommonActions.INTERVAL_UPDATE.STATE.create());
    }
  }
}
