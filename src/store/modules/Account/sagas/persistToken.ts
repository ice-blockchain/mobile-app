// SPDX-License-Identifier: ice License 1.0

import {clearPersistedToken, persistToken} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {authTokenSelector} from '@store/modules/Account/selectors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* persistTokenSaga({
  payload,
}: ReturnType<typeof AccountActions.SET_TOKEN.STATE.create>) {
  const token: SagaReturnType<typeof authTokenSelector> = yield select(
    authTokenSelector,
  );
  if (payload.token && payload.token.issuer === 'custom') {
    yield call(persistToken, payload.token);
    yield put(AccountActions.PERSIST_TOKEN.SUCCESS.create());
  } else if (!payload.token && token?.issuer === 'custom') {
    yield call(clearPersistedToken);
  }
}
