// SPDX-License-Identifier: ice License 1.0

import {removeSecureValue, setSecureValue} from '@services/keychain';
import {AccountActions} from '@store/modules/Account/actions';
import {authTokenSelector} from '@store/modules/Account/selectors';
import {call, SagaReturnType, select} from 'redux-saga/effects';

export function* persistTokenSaga({
  payload,
}: // OR DISPATCH CUSTOM ACTION FOR THAT?
ReturnType<typeof AccountActions.SET_TOKEN.STATE.create>) {
  const token: SagaReturnType<typeof authTokenSelector> = yield select(
    authTokenSelector,
  );
  if (payload.token && payload.token.issuer === 'custom') {
    yield call(setSecureValue, 'token', JSON.stringify(payload.token));
  } else if (token?.issuer === 'custom') {
    yield call(removeSecureValue, 'token');
  }
}
