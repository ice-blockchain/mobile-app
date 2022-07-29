// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {isAuthInitializedSelector} from '@store/modules/Auth/selectors';
import {isDevicesInitializedSelector} from '@store/modules/Devices/selectors';
import {fork, put, select, take} from 'redux-saga/effects';

function* isAppInitialized() {
  const isAuthInitialized: boolean = yield select(isAuthInitializedSelector);
  const isDevicesInitialized: boolean = yield select(
    isDevicesInitializedSelector,
  );
  return isAuthInitialized && isDevicesInitialized;
}

export function* rootAppCommonSaga() {
  yield fork(function* () {
    while (!(yield* isAppInitialized())) {
      yield take('*');
    }
    yield put(AppCommonActions.APP_INITIALIZED.STATE.create());
  });
}
