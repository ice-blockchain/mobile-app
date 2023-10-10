// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Account/actions';
import {userIdSelector} from '@store/modules/Account/selectors';
import {showError} from '@utils/errors';
import {call, put, select, spawn} from 'redux-saga/effects';

export function* deleteAccountSaga() {
  try {
    let userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    yield call(Api.faceRecognition.deleteFaceAuthData);
    yield call(Api.user.deleteUser, userId);
    yield put(AccountActions.DELETE_ACCOUNT.SUCCESS.create());
    yield put(AccountActions.SIGN_OUT.START.create({skipMetadataUpdate: true}));
  } catch (error) {
    yield put(AccountActions.DELETE_ACCOUNT.FAILED.create());
    yield spawn(showError, error);
    throw error;
  }
}
