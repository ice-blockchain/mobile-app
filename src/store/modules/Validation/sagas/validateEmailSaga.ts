// SPDX-License-Identifier: ice License 1.0

import {getApiErrorCode, isApiError} from '@api/client';
import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Account/actions';
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
    yield call(Api.validations.validateEmail, {
      userId,
      email: temporaryEmail,
      validationCode,
    });

    yield put(ValidationActions.EMAIL_VALIDATION.SUCCESS.create());
  } catch (error) {
    let localizedError = getErrorMessage(error);

    if (isApiError(error, 400, 'INVALID_VALIDATION_CODE')) {
      localizedError = t('errors.invalid_validation_code');
    } else if (isApiError(error, 400, 'VALIDATION_EXPIRED')) {
      localizedError = t('errors.validation_expired');
    } else if (isApiError(error, 404, 'VALIDATION_NOT_FOUND')) {
      const {data: freshUser}: SagaReturnType<typeof Api.user.getUserById> =
        yield call(Api.user.getUserById, userId);
      yield put(AccountActions.UPDATE_ACCOUNT.SUCCESS.create(freshUser));
      localizedError = t('errors.validation_not_found');
    } else if (isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER')) {
      const field = error?.response?.data?.data?.field;
      switch (field) {
        case 'username':
          localizedError = t('username.error.already_taken');
          break;
        case 'email':
          localizedError = t('errors.email_already_taken');
          break;
        case 'phoneNumberHash':
        case 'phoneNumber':
          localizedError = t('errors.phone_number_already_taken');
          break;
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
