// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client/utils';
import {Api} from '@api/index';
import {ValidationActions} from '@store/modules/Validation/actions';
import {t} from '@translations/i18n';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = ValidationActions.USERNAME_VALIDATION.START.create;

export function* validateUsernameSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {username} = action.payload;
  try {
    const validationResult: SagaReturnType<typeof Api.user.getUserByUsername> =
      yield call(Api.user.getUserByUsername, {username});
    if (validationResult) {
      yield put(
        ValidationActions.USERNAME_VALIDATION.FAILED.create(
          t('username.error.already_taken'),
        ),
      );
    }
  } catch (error) {
    if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      yield put(ValidationActions.USERNAME_VALIDATION.SUCCESS.create(username));
    } else if (isApiError(error, 400, 'INVALID_USERNAME')) {
      yield put(
        ValidationActions.USERNAME_VALIDATION.FAILED.create(
          t('username.error.invalid_characters'),
        ),
      );
    } else {
      yield put(
        ValidationActions.USERNAME_VALIDATION.FAILED.create(
          t('username.error.some_error'),
        ),
      );
    }
  }
}
