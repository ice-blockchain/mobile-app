// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {verifyBeforeUpdateEmail} from '@services/auth';
import {
  isValidationError,
  ValidationError,
  ValidationErrorCode,
} from '@store/errors/validation';
import {AccountActions} from '@store/modules/Account/actions';
import {updateAccountSaga} from '@store/modules/Account/sagas/updateAccount';
import {userSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import {validateEmail} from '@utils/email';
import {getErrorMessage} from '@utils/errors';
import {call, put, select, take} from 'redux-saga/effects';

const actionCreator = AccountActions.MODIFY_EMAIL_WITH_LINK.START.create;

export function* modifyEmailWithLinkSaga({
  payload: {email},
}: ReturnType<typeof actionCreator>) {
  const user: User = yield select(userSelector);
  try {
    if (!validateEmail(email)) {
      throw new ValidationError(ValidationErrorCode.InvalidEmail);
    } else if (email.toLowerCase() === user?.email?.toLowerCase()) {
      throw new ValidationError(ValidationErrorCode.SameEmail);
    }

    yield call(verifyBeforeUpdateEmail, email);
    yield put(
      AccountActions.MODIFY_EMAIL_WITH_LINK.SET_TEMP_EMAIL.create(email),
    );

    let finished = false;
    while (!finished) {
      const action: ReturnType<
        | typeof AccountActions.MODIFY_EMAIL_WITH_LINK.CONFIRM_TEMP_EMAIL.create
        | typeof AccountActions.MODIFY_EMAIL_WITH_LINK.RESET.create
      > = yield take([
        AccountActions.MODIFY_EMAIL_WITH_LINK.CONFIRM_TEMP_EMAIL.type,
      ]);

      switch (action.type) {
        case AccountActions.MODIFY_EMAIL_WITH_LINK.CONFIRM_TEMP_EMAIL.type: {
          try {
            const parsedUrl = new URL(action.payload.link);
            if (
              !parsedUrl.searchParams.get('link')?.includes(`email=${email}`)
            ) {
              throw new Error(t('errors.general_error_message'));
            } else {
              yield call(
                updateAccountSaga,
                AccountActions.UPDATE_ACCOUNT.START.create({
                  email,
                  skipEmailValidation: true,
                }),
              );
              yield put(AccountActions.MODIFY_EMAIL_WITH_LINK.SUCCESS.create());
              /**
               * User updated email:
               * this action requires force logout because firebase
               * auth token expires immediately (a major account change)
               * https://firebase.google.com/docs/auth/admin/manage-sessions
               */
              yield put(AccountActions.SIGN_OUT.START.create());
              finished = true;
            }
          } catch (error) {
            yield put(
              AccountActions.MODIFY_EMAIL_WITH_LINK.FAILED.create(
                getErrorMessage(error),
              ),
            );
          }
          break;
        }
        case AccountActions.MODIFY_EMAIL_WITH_LINK.RESET.type:
          finished = true;
          break;
      }
    }
  } catch (error) {
    let validateError;

    if (isValidationError(error)) {
      validateError = error.message;
    }

    yield put(
      AccountActions.MODIFY_EMAIL_WITH_LINK.FAILED.create(
        validateError ?? getErrorMessage(error),
      ),
    );

    if (!validateError) {
      throw error;
    }
  }
}
