// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Account/actions';
import {userIdSelector, userSelector} from '@store/modules/Account/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getAccountSaga() {
  try {
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    const existingUser: ReturnType<typeof userSelector> = yield select(
      userSelector,
    );
    const user: SagaReturnType<typeof Api.user.getUserById> = yield call(
      Api.user.getUserById,
      userId,
    );
    yield put(AccountActions.GET_ACCOUNT.SUCCESS.create(user));

    const currentUserLanguage = existingUser?.language;
    if (currentUserLanguage && user.language) {
      yield put(
        AccountActions.SYNC_LANGUAGES.SUCCESS.create(
          currentUserLanguage,
          user.language,
        ),
      );
    }
  } catch (error) {
    const localizedError = getErrorMessage(error);
    yield put(AccountActions.GET_ACCOUNT.FAILED.create(localizedError));
    throw error;
  }
}
