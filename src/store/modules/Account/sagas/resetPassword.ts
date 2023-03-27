// SPDX-License-Identifier: ice License 1.0

import {sendPasswordResetEmail} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
import {call, put} from 'redux-saga/effects';

enum ValidateError {
  InvalidEmail,
}

export function* resetPasswordSaga(
  startAction: ReturnType<typeof AccountActions.RESET_PASSWORD.START.create>,
) {
  try {
    const {email} = startAction.payload;

    if (!email) {
      throw {code: ValidateError.InvalidEmail};
    }

    yield call(sendPasswordResetEmail, email);

    yield put(AccountActions.RESET_PASSWORD.SUCCESS.create({email}));
  } catch (error) {
    if (checkProp(error, 'code') && error.code === ValidateError.InvalidEmail) {
      yield put(
        AccountActions.RESET_PASSWORD.FAILED.create(t('errors.invalid_email')),
      );
    } else {
      yield put(
        AccountActions.RESET_PASSWORD.FAILED.create(getErrorMessage(error)),
      );
      throw error;
    }
  }
}
