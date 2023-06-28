// SPDX-License-Identifier: ice License 1.0

import {removeSecureValue, setSecureValue} from '@services/keychain';
import {AccountActions} from '@store/modules/Account/actions';
import {authTokenSelector} from '@store/modules/Account/selectors';
import {call, SagaReturnType, select} from 'redux-saga/effects';

export function* persistTokenSaga({
  payload,
}: ReturnType<typeof AccountActions.SET_TOKEN.STATE.create>) {
  const token: SagaReturnType<typeof authTokenSelector> = yield select(
    authTokenSelector,
  );
  if (payload.token) {
    yield call(setSecureValue, 'token', JSON.stringify(payload.token));
  } else if (token) {
    yield call(removeSecureValue, 'token');
  }
}
