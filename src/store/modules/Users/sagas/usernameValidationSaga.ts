// SPDX-License-Identifier: BUSL-1.1

import {put} from 'redux-saga/effects';
import Api from '../../../../api';
import UsersActions from '../actions';

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
export interface Error {
  message: string;
}

const actionCreator = UsersActions.USERNAME_VALIDATION.START.create;

export default function* usernameValidationSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {username} = action.payload;
  console.log(username, Api);
  try {
    const response: ResponseGenerator = yield Api.users.usernameValidation({
      username,
    });
    console.log(response);
    yield put(UsersActions.USERNAME_VALIDATION.SUCCESS.create());
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(UsersActions.USERNAME_VALIDATION.FAILED.create(errorMessage));
  }
}
