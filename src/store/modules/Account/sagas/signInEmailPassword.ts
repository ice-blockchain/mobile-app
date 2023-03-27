// SPDX-License-Identifier: ice License 1.0

import {signInWithEmailAndPassword} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
import {call, put} from 'redux-saga/effects';

enum ValidateError {
  InvalidEmail,
}

export function* signInEmailPasswordSaga(
  startAction: ReturnType<
    typeof AccountActions.SIGN_IN_EMAIL_PASSWORD.START.create
  >,
) {
  try {
    const {email, password} = startAction.payload;

    if (!email) {
      throw {code: ValidateError.InvalidEmail};
    }

    yield call(signInWithEmailAndPassword, email, password);

    yield put(AccountActions.SIGN_IN_EMAIL_PASSWORD.SUCCESS.create());
  } catch (error) {
    if (checkProp(error, 'code') && error.code === ValidateError.InvalidEmail) {
      yield put(
        AccountActions.SIGN_IN_EMAIL_PASSWORD.FAILED.create(
          t('errors.invalid_email'),
          {field: 'email'},
        ),
      );
    } else {
      yield put(
        AccountActions.SIGN_IN_EMAIL_PASSWORD.FAILED.create(
          getErrorMessage(error),
          {
            field:
              checkProp(error, 'code') &&
              ['auth/weak-password', 'auth/wrong-password'].includes(
                error.code as string,
              )
                ? 'password'
                : 'email',
          },
        ),
      );
      throw error;
    }
  }
}
