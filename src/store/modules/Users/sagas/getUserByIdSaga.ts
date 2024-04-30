// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {UsersActions} from '@store/modules/Users/actions';
import {getErrorMessage} from '@utils/errors';
import {put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = UsersActions.GET_USER_BY_ID.START.create;

export function* getUserByIdSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {userId} = action.payload;
    const {data: response}: SagaReturnType<typeof Api.user.getUserById> =
      yield Api.user.getUserById(userId);
    yield put(UsersActions.GET_USER_BY_ID.SUCCESS.create(response));
  } catch (error) {
    yield put(
      UsersActions.GET_USER_BY_ID.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
