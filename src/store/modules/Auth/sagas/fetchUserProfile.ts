// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client/utils';
import {Api} from '@api/index';
import {UserProfile} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Auth/selectors';
import {call, put, select} from 'redux-saga/effects';

export function* fetchUserProfileSaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    if (isAuthorized) {
      const userId: ReturnType<typeof userIdSelector> = yield select(
        userIdSelector,
      );

      const profile: UserProfile = yield call(fetchUserProfile, userId);

      yield put(AuthActions.FETCH_USER_PROFILE.SUCCESS.create(profile));
    } else {
      yield put(AuthActions.FETCH_USER_PROFILE.FAILED.create('Not authorized'));
    }
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(AuthActions.FETCH_USER_PROFILE.FAILED.create(errorMessage));
  }
}

export function* fetchUserProfile(userId: string) {
  try {
    const profile: UserProfile = yield call(Api.user.getUserById, userId);
    return profile;
  } catch (error) {
    if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      return null;
    } else {
      throw error;
    }
  }
}
