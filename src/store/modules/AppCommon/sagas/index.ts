// SPDX-License-Identifier: ice License 1.0

import {appInitializedHandlerSaga} from '@store/modules/AppCommon/sagas/appInitializedHandler';
import {appLoadedHandlerSaga} from '@store/modules/AppCommon/sagas/appLoadedHandlerSaga';
import {fork} from 'redux-saga/effects';

export const appCommonWatchers = [
  fork(appInitializedHandlerSaga),
  fork(appLoadedHandlerSaga),
];
