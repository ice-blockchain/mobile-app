// SPDX-License-Identifier: ice License 1.0

import {getApiErrorCode, isApiError} from '@api/client';
import {Api} from '@api/index';
import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {updateAccountSaga} from '@store/modules/Account/sagas/updateAccount';
import {userIdSelector} from '@store/modules/Account/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {temporaryEmailSelector} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = ValidationActions.EMAIL_VALIDATION.START.create;

export function* validateEmailSaga(action: ReturnType<typeof actionCreator>) {
  const userId: string = yield select(userIdSelector);
  try {
    const {validationCode} = action.payload;
    const temporaryEmail: ReturnType<typeof temporaryEmailSelector> =
      yield select(temporaryEmailSelector);
    if (!temporaryEmail) {
      throw new Error('Temporary email number is null');
    }
    let user: SagaReturnType<typeof Api.validations.validateEmail> = yield call(
      Api.validations.validateEmail,
      {
        userId,
        email: temporaryEmail,
        validationCode,
      },
    );

    yield call(setEmailRegistrationStep, user);

    yield put(ValidationActions.EMAIL_VALIDATION.SUCCESS.create());
  } catch (error) {
    let localizedError = getErrorMessage(error);

    if (isApiError(error, 400, 'INVALID_VALIDATION_CODE')) {
      localizedError = t('errors.invalid_validation_code');
    } else if (isApiError(error, 400, 'VALIDATION_EXPIRED')) {
      localizedError = t('errors.validation_expired');
    } else if (isApiError(error, 404, 'VALIDATION_NOT_FOUND')) {
      const freshUser: SagaReturnType<typeof Api.user.getUserById> = yield call(
        Api.user.getUserById,
        userId,
      );
      yield put(AccountActions.UPDATE_ACCOUNT.SUCCESS.create(freshUser));
      localizedError = t('errors.validation_not_found');
    } else if (isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER')) {
      const field = error?.response?.data?.data?.field;
      if (field === 'email') {
        localizedError = t('errors.already_taken', {field});
      }
    }

    yield put(
      ValidationActions.EMAIL_VALIDATION.FAILED.create(
        localizedError,
        getApiErrorCode(error),
      ),
    );

    throw error;
  }
}

function* setEmailRegistrationStep(user: User): Generator<unknown, void, void> {
  const finalizedSteps =
    user.clientData?.registrationProcessFinalizedSteps ?? [];
  if (!finalizedSteps.includes('email')) {
    return yield call(
      updateAccountSaga,
      AccountActions.UPDATE_ACCOUNT.START.create(
        {
          clientData: {
            ...user.clientData,
            registrationProcessFinalizedSteps: [...finalizedSteps, 'email'],
          },
          checksum: user.checksum,
        },
        function* (freshUser) {
          yield call(setEmailRegistrationStep, freshUser);
          return {retry: false};
        },
      ),
    );
  }
}
