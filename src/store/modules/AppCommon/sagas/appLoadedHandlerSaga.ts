// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {isAppLoadedSelector} from '@store/modules/AppCommon/selectors';
import {put, SagaReturnType, select} from 'redux-saga/effects';

export function* appLoadedHandlerSaga() {
  const isAppLoaded: SagaReturnType<typeof isAppLoadedSelector> = yield select(
    isAppLoadedSelector,
  );
  if (!isAppLoaded) {
    yield put(AppCommonActions.APP_LOADED.STATE.create());
  }
}
