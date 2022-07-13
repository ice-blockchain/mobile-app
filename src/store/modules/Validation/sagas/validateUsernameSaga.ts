// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client/utils';
import {Api} from '@api/index';
import {ValidationActions} from '@store/modules/Validation/actions';
import {put} from 'redux-saga/effects';

const actionCreator = ValidationActions.USERNAME_VALIDATION.START.create;

export function* validateUsernameSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {username} = action.payload;
  try {
    yield Api.validations.validateUsername({username});
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
