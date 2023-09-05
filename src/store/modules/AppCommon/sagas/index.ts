// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {appInitializedHandlerSaga} from '@store/modules/AppCommon/sagas/appInitializedHandler';
import {appLoadedHandlerSaga} from '@store/modules/AppCommon/sagas/appLoadedHandlerSaga';
import {intervalUpdatesSaga} from '@store/modules/AppCommon/sagas/intervalUpdates';
import {fork, takeLatest} from 'redux-saga/effects';

export const appCommonWatchers = [
  fork(appInitializedHandlerSaga),
  fork(appLoadedHandlerSaga),
  takeLatest(
    [
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
    ],
    intervalUpdatesSaga,
  ),
];
