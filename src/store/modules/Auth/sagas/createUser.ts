// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client/utils';
import {Api} from '@api/index';
import {UserProfile} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {magicUserSelector} from '@store/modules/Auth/selectors';
import {
  refUserSelector,
  usernameSelector,
} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import {sha256} from 'react-native-sha256';
import {call, put, select} from 'redux-saga/effects';

export function* createUserSaga() {
  try {
    const magicUser: ReturnType<typeof magicUserSelector> = yield select(
      magicUserSelector,
    );

    const username: ReturnType<typeof usernameSelector> = yield select(
      usernameSelector,
    );

    const refUser: ReturnType<typeof refUserSelector> = yield select(
      refUserSelector,
    );

    let phoneNumber = null;
    let phoneNumberHash: string | null = null;
    let email = null;
    let refUserId = null;

    if (magicUser) {
      phoneNumber = magicUser.phoneNumber;
      email = magicUser.email;

      if (phoneNumber) {
        phoneNumberHash = yield call(sha256, phoneNumber);
      }
    }

    if (refUser && refUser.id) {
      refUserId = refUser.id;
    }

    const createdUser: UserProfile = yield call(Api.user.createUser, {
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      phoneNumberHash: phoneNumberHash,
      referredBy: refUserId,
    });
    yield put(AuthActions.CREATE_USER.SUCCESS.create(createdUser));
  } catch (error) {
    let localizedError = '';
    if (isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER')) {
      const {response} = error;
      if (response?.data?.data?.field === 'username') {
        localizedError = t('error.user_exist');
      } else if (response?.data?.data?.field === 'id') {
        yield put(AuthActions.FETCH_USER_PROFILE.START.create());
      }
    } else if (isApiError(error, 400)) {
      localizedError = t('errors.validation_error');
    } else if (isApiError(error, 404, 'REFERRAL_NOT_FOUND')) {
      localizedError = t('errors.ref_not_found');
    }
    yield put(AuthActions.CREATE_USER.FAILED.create(localizedError));
  }
}
