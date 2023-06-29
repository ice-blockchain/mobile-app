// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {getAuthenticatedUser} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {
  appLocaleSelector,
  userInfoSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import {temporaryPhoneNumberIsoSelector} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import {getErrorMessage, showError} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* userStateChangeSaga() {
  try {
    const authenticatedUser: SagaReturnType<typeof getAuthenticatedUser> =
      yield call(getAuthenticatedUser);

    if (authenticatedUser) {
      yield put(AccountActions.SET_TOKEN.STATE.create(authenticatedUser.token));

      let user: ReturnType<typeof userSelector> = yield select(userSelector);

      if (user === null) {
        user = yield call(getUser, authenticatedUser.uid);
      }

      if (user === null) {
        user = yield call(createUser, {
          email: authenticatedUser.email,
          phoneNumber: authenticatedUser.phoneNumber,
        });
        // Request firebase user once again after create-user to get updated claims
        // This forceRefresh triggers userStateChange
        yield call(getAuthenticatedUser, true);
      }

      yield put(
        AccountActions.USER_STATE_CHANGE.SUCCESS.create(
          user,
          authenticatedUser.isAdmin,
        ),
      );
    } else {
      yield put(AccountActions.SET_TOKEN.STATE.create(null));
      yield put(AccountActions.USER_STATE_CHANGE.SUCCESS.create(null, null));
    }
  } catch (error) {
    let localizedError = getErrorMessage(error);

    if (isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER')) {
      const field = error?.response?.data?.data?.field;
      if (field !== 'id') {
        localizedError = t('errors.multiple_accounts');
      }
    }

    yield put(AccountActions.USER_STATE_CHANGE.FAILED.create(localizedError));
    showError(error);

    throw error;
  }
}

function* getUser(userId: string) {
  try {
    const user: SagaReturnType<typeof Api.user.getUserById> = yield call(
      Api.user.getUserById,
      userId,
    );
    yield put(AnalyticsActions.TRACK_SIGN_IN.START.create({user}));
    return user;
  } catch (error) {
    if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      return null;
    } else {
      throw error;
    }
  }
}

function* createUser({
  email,
  phoneNumber,
}: {
  email: string | null;
  phoneNumber: string | null;
}) {
  const appLocale: SagaReturnType<typeof appLocaleSelector> = yield select(
    appLocaleSelector,
  );

  const userInfo: ReturnType<typeof userInfoSelector> = yield select(
    userInfoSelector,
  );

  const phoneNumberIso: ReturnType<typeof temporaryPhoneNumberIsoSelector> =
    yield select(temporaryPhoneNumberIsoSelector);

  let normalizedNumber: string | null = null;
  let phoneNumberHash: string | null = null;
  if (phoneNumber) {
    normalizedNumber = e164PhoneNumber(phoneNumber);

    if (!normalizedNumber) {
      throw new Error(t('errors.general_error_message'));
    }

    phoneNumberHash = yield call(hashPhoneNumber, normalizedNumber);
  }

  const user: SagaReturnType<typeof Api.user.createUser> = yield call(
    Api.user.createUser,
    {
      firstName: userInfo?.firstName ?? null,
      lastName: userInfo?.lastName ?? null,
      email,
      phoneNumber: normalizedNumber,
      phoneNumberHash,
      clientData: {
        phoneNumberIso,
      },
      language: appLocale,
    },
  );

  yield put(AnalyticsActions.TRACK_SIGN_UP.SUCCESS.create());

  return user;
}
