// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Account/actions';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = AccountActions.UPDATE_REF_BY_USERNAME.START.create;

export function* updateRefByUsernameSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {refUsername} = action.payload;
  try {
    const {data: refUser}: SagaReturnType<typeof Api.user.getUserByUsername> =
      yield call(Api.user.getUserByUsername, {username: refUsername});
    yield put(AccountActions.UPDATE_REF_BY_USERNAME.SUCCESS.create(refUser));
    yield put(
      AccountActions.UPDATE_ACCOUNT.START.create({referredBy: refUser.id}),
    );
  } catch (error) {
    let localizedError = getErrorMessage(error);
    if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      localizedError = t('username.error.not_found');
    }
    yield put(
      AccountActions.UPDATE_REF_BY_USERNAME.FAILED.create(localizedError),
    );
  }
}
