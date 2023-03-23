// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {appInitializedHandlerSaga} from '@store/modules/AppCommon/sagas/appInitializedHandler';
import {intervalUpdatesSaga} from '@store/modules/AppCommon/sagas/intervalUpdates';
import {all, fork, takeLatest} from 'redux-saga/effects';

export function* rootAppCommonSaga() {
  yield all([
    fork(appInitializedHandlerSaga),
    takeLatest(
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      intervalUpdatesSaga,
    ),
  ]);
}
