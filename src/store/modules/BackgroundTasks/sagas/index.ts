// SPDX-License-Identifier: ice License 1.0

import {initBackgroundTasksSaga} from '@store/modules/BackgroundTasks/sagas/initBackgroundTasksSaga';
import {all, fork} from 'redux-saga/effects';

export function* rootBackgroundTasksSaga() {
  yield all([fork(initBackgroundTasksSaga)]);
}
