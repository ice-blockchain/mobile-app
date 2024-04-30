// SPDX-License-Identifier: ice License 1.0

import {sendSignInLinkToEmail, signInWithEmailLink} from '@services/auth';
import {
  isValidationError,
  ValidationError,
  ValidationErrorCode,
} from '@store/errors/validation';
import {AccountActions} from '@store/modules/Account/actions';
import {validateEmail} from '@utils/email';
import {getErrorMessage} from '@utils/errors';
import {call, put, take} from 'redux-saga/effects';

export function* signInEmailLinkSaga(
  startAction: ReturnType<
    typeof AccountActions.SIGN_IN_EMAIL_LINK.START.create
  >,
) {
  try {
    const email = startAction.payload.email;

    if (!validateEmail(email)) {
      throw new ValidationError(ValidationErrorCode.InvalidEmail);
    }

    yield call(sendSignInLinkToEmail, email);
    yield put(AccountActions.SIGN_IN_EMAIL_LINK.SET_TEMP_EMAIL.create(email));

    let finished = false;
    while (!finished) {
      const action: ReturnType<
        | typeof AccountActions.SIGN_IN_EMAIL_LINK.CONFIRM_TEMP_EMAIL.create
        | typeof AccountActions.SIGN_IN_EMAIL_LINK.RESET.create
      > = yield take([
        AccountActions.SIGN_IN_EMAIL_LINK.CONFIRM_TEMP_EMAIL.type,
        AccountActions.SIGN_IN_EMAIL_LINK.RESET.type,
      ]);

      switch (action.type) {
        case AccountActions.SIGN_IN_EMAIL_LINK.CONFIRM_TEMP_EMAIL.type: {
          try {
            yield call(signInWithEmailLink, email, action.payload.link);
            yield put(AccountActions.SIGN_IN_EMAIL_LINK.SUCCESS.create());
            finished = true;
          } catch (error) {
            yield put(
              AccountActions.SIGN_IN_EMAIL_LINK.FAILED.create(
                getErrorMessage(error),
              ),
            );
          }
          break;
        }
        case AccountActions.SIGN_IN_EMAIL_LINK.RESET.type:
          finished = true;
          break;
      }
    }
  } catch (error) {
    if (isValidationError(error)) {
      yield put(AccountActions.SIGN_IN_EMAIL_LINK.FAILED.create(error.message));
    } else {
      yield put(
        AccountActions.SIGN_IN_EMAIL_LINK.FAILED.create(getErrorMessage(error)),
      );
      throw error;
    }
  }
}
