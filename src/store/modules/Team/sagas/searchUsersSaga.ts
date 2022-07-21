// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {TeamActions, UserSearchResult} from '@store/modules/Team/actions';
import {put} from 'redux-saga/effects';

const actionCreator = TeamActions.SEARCH_USERS.START.create;

export function* searchUsersSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {query, signal} = action.payload;

    const result: UserSearchResult[] = yield Api.user.searchUsers(
      query,
      signal,
    );
    yield put(TeamActions.SEARCH_USERS.SUCCESS.create(result));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(TeamActions.SEARCH_USERS.FAILED.create(errorMessage));
  }
}
