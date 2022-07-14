// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client/utils';
import {Api} from '@api/index';
import {ValidationActions} from '@store/modules/Validation/actions';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = ValidationActions.USERNAME_VALIDATION.START.create;

export function* validateUsernameSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {username} = action.payload;
  try {
    const validationResult: SagaReturnType<
      typeof Api.validations.validateUsername
    > = yield call(Api.validations.validateUsername, {username});
    if (validationResult) {
      yield put(
        ValidationActions.USERNAME_VALIDATION.FAILED.create(
          'Nickname already taken.',
        ),
      );
    }
  } catch (error) {
    if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      yield put(ValidationActions.USERNAME_VALIDATION.SUCCESS.create(username));
    } else {
      yield put(
        ValidationActions.USERNAME_VALIDATION.FAILED.create(
          'SOME ERROR validateUsernameSaga',
        ),
      );
    }
  }
}
