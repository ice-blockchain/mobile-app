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
import {isEmpty} from 'lodash';
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
      phoneNumber = !isEmpty(magicUser.phoneNumber)
        ? magicUser.phoneNumber
        : null;
      email = !isEmpty(magicUser.email) ? magicUser.email : null;

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
    if (isApiError(error, 409)) {
      localizedError = t('error.user_exist');
    } else {
      localizedError = t('error.general_error');
    }
    yield put(AuthActions.CREATE_USER.FAILED.create(localizedError));
  }
}
