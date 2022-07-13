// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client/utils';
import {Api} from '@api/index';
import {ValidationActions} from '@store/modules/Validation/actions';
import {put} from 'redux-saga/effects';

const actionCreator = ValidationActions.REF_USERNAME_VALIDATION.START.create;

export function* validateRefUsernameSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {refUsername, skipValidation} = action.payload;
  try {
    if (skipValidation) {
      yield put(
        ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.create(refUsername),
      );
    } else {
      yield Api.validations.validateUsername({username: refUsername});
      yield put(
        ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.create(refUsername),
      );
    }
  } catch (error) {
    if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      yield put(
        ValidationActions.REF_USERNAME_VALIDATION.FAILED.create(
          'Nickname not found',
        ),
      );
    } else {
      yield put(
        ValidationActions.REF_USERNAME_VALIDATION.FAILED.create('SOME ERROR'),
      );
    }
  }
}
