// SPDX-License-Identifier: ice License 1.0

import {APP_AUTO_UPDATE_INTERVAL_SEC} from '@constants/timeouts';
import {isAuthorizedSelector} from '@store/modules/Account/selectors';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {delay, put, select} from 'redux-saga/effects';

export function* intervalUpdatesSaga() {
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );

  if (isAuthorized) {
    while (true) {
      yield delay(APP_AUTO_UPDATE_INTERVAL_SEC * 1000);
      yield put(AppCommonActions.INTERVAL_UPDATE.STATE.create());
    }
  }
}
