// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {verifyBeforeUpdateEmail} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {updateAccountSaga} from '@store/modules/Account/sagas/updateAccount';
import {userSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import {validateEmail} from '@utils/email';
import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
import {call, put, select, take} from 'redux-saga/effects';

const actionCreator = AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.START.create;

enum ValidateError {
  InvalidEmail,
  SameEmail,
}

export function* verifyBeforeUpdateEmailSaga({
  payload: {email},
}: ReturnType<typeof actionCreator>) {
  const user: User = yield select(userSelector);
  try {
    if (!validateEmail(email)) {
      throw {code: ValidateError.InvalidEmail};
    } else if (email === user?.email) {
      throw {code: ValidateError.SameEmail};
    }

    yield call(verifyBeforeUpdateEmail, email);
    yield put(
      AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.SET_TEMP_EMAIL.create(email),
    );

    let finished = false;
    while (!finished) {
      const action: ReturnType<
        | typeof AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.CONFIRM_TEMP_EMAIL.create
        | typeof AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.RESET.create
      > = yield take([
        AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.CONFIRM_TEMP_EMAIL.type,
      ]);

      switch (action.type) {
        case AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.CONFIRM_TEMP_EMAIL
          .type: {
          try {
            const parsedUrl = new URL(action.payload.link);
            if (
              !parsedUrl.searchParams.get('link')?.includes(`email=${email}`)
            ) {
              throw new Error(t('errors.general_error_message'));
            } else {
              yield call(updateEmail, user, email);
              yield put(
                AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.SUCCESS.create(),
              );
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
              AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.FAILED.create(
                getErrorMessage(error),
              ),
            );
          }
          break;
        }
        case AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.RESET.type:
          finished = true;
          break;
      }
    }
  } catch (error) {
    let validateError;

    if (checkProp(error, 'code')) {
      switch (error.code) {
        case ValidateError.InvalidEmail:
          validateError = t('errors.invalid_email');
          break;
        case ValidateError.SameEmail:
          validateError = t('errors.same_email');
          break;
      }
    }

    yield put(
      AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.FAILED.create(
        validateError ?? getErrorMessage(error),
      ),
    );

    if (!validateError) {
      throw error;
    }
  }
}

function* updateEmail(
  userToUpdate: User,
  email: string,
): Generator<unknown, void, void> {
  const finalizedSteps =
    userToUpdate.clientData?.registrationProcessFinalizedSteps ?? [];

  const steps = [...finalizedSteps];
  if (!finalizedSteps.includes('email')) {
    steps.push('email');
  }

  return yield call(
    updateAccountSaga,
    AccountActions.UPDATE_ACCOUNT.START.create(
      {
        email,
        skipEmailValidation: true,
        clientData: {
          ...userToUpdate.clientData,
          registrationProcessFinalizedSteps: steps,
        },
      },
      function* (freshUser) {
        if (
          !freshUser.clientData?.registrationProcessFinalizedSteps?.includes(
            'email',
          ) ||
          freshUser.email !== email
        ) {
          updateEmail(freshUser, email);
        }
        return {retry: false};
      },
    ),
  );
}
