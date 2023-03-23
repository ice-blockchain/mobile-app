// SPDX-License-Identifier: ice License 1.0

import {signInWithProvider} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* signInSocialSaga(
  action: ReturnType<typeof AccountActions.SIGN_IN_SOCIAL.START.create>,
) {
  try {
    const result: SagaReturnType<typeof signInWithProvider> = yield call(
      signInWithProvider,
      action.payload.provider,
    );

    if (!result.cancelled) {
      yield put(AccountActions.SIGN_IN_SOCIAL.SUCCESS.create(result.userInfo));
    } else {
      yield put(AccountActions.SIGN_IN_SOCIAL.CLEAR.create());
    }
  } catch (error) {
    //TODO:find out how to catch account-exists-with-different-credential -> run "unusual activity" flow
    yield put(
      AccountActions.SIGN_IN_SOCIAL.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
