// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {initBackgroundTasksSaga} from '@store/modules/BackgroundTasks/sagas/initBackgroundTasksSaga';
import {all, takeLatest} from 'redux-saga/effects';

export function* rootBackgroundTasksSaga() {
  yield all([
    takeLatest(AppCommonActions.APP_LOADED.STATE.type, initBackgroundTasksSaga),
  ]);
}
