// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Account/actions';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getAuthConfigSaga() {
  try {
    const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
      isAppActiveSelector,
    );

    if (!isAppActive) {
      return;
    }

    const {data: authConfig}: SagaReturnType<typeof Api.auth.getConfig> =
      yield call(Api.auth.getConfig);
    yield put(AccountActions.GET_AUTH_CONFIG.SUCCESS.create(authConfig));
  } catch (error) {
    yield put(
      AccountActions.GET_AUTH_CONFIG.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
