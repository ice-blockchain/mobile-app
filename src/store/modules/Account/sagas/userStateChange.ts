// SPDX-License-Identifier: ice License 1.0

import {getMetadata} from '@api/auth/getMetadata';
import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {User} from '@api/user/types';
import {getAuthenticatedUser, refreshAuthToken} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {
  appLocaleSelector,
  installReferrerSelector,
  userInfoSelector,
} from '@store/modules/Account/selectors';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import {temporaryPhoneNumberIsoSelector} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import {getErrorMessage, showError} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

/**
 * We keep the created user so we can use it after the token refresh
 * (that restarts the userStateChangeSaga) to finish the process without
 * requesting the user once again
 */
let createdUser: User | null = null;

/**
 * Listener for changes in the users auth state (logging in and out)
 *  and when credentials are linked.
 * This method is also called when the subscription is first established -
 *  to set the initial user state.
 */
export function* userStateChangeSaga() {
  try {
    const authenticatedUser: SagaReturnType<typeof getAuthenticatedUser> =
      yield call(getAuthenticatedUser);

    if (authenticatedUser) {
      yield put(AccountActions.SET_TOKEN.STATE.create(authenticatedUser.token));

      let user = createdUser;
      createdUser = null;

      const userMetadata: SagaReturnType<typeof getMetadata> = yield call(
        updateUserMetadata,
      );

      if (userMetadata && user === null) {
        user = yield call(getUser, userMetadata.userId);
      }

      if (user === null) {
        createdUser = yield call(createUser, {
          email: authenticatedUser.email,
          phoneNumber: authenticatedUser.phoneNumber,
        });
        yield call(refreshAuthToken, authenticatedUser.token, {
          forceUpdate: true,
        });
        /**
         * In case of firebase, userStateChange is triggered by the lib,
         *  because of the forceRefresh flag.
         * In other cases we trigger it manually.
         */
        yield put(AccountActions.USER_STATE_CHANGE.START.create());
        return;
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

    yield spawn(showError, error);

    yield call(rollBackOnError, error);

    throw error;
  }
}

function* rollBackOnError(error: unknown) {
  /**
   * In case of CONFLICT_WITH_ANOTHER_USER sign up error
   * we need to remove the firebase / custom tokens
   * So it won't stuck in a dead loop:
   *  AppLoaded -> LoadTokens -> SignUp -> 409 -> ErrorScreen
   */
  if (isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER')) {
    yield put(AccountActions.SIGN_OUT.START.create());
  }
}

function* updateUserMetadata() {
  try {
    const userMetadata: SagaReturnType<typeof Api.auth.getMetadata> =
      yield call(Api.auth.getMetadata);
    yield put(
      AccountActions.SET_USER_METADATA.STATE.create(userMetadata.metadata),
    );
    return userMetadata;
  } catch (error) {
    if (isApiError(error, 404, 'METADATA_NOT_FOUND')) {
      return null;
    } else {
      throw error;
    }
  }
}

function* getUser(userId: string) {
  try {
    const {data: user}: SagaReturnType<typeof Api.user.getUserById> =
      yield call(Api.user.getUserById, userId);
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

  const installReferrerId: SagaReturnType<typeof getInstallReferrerId> =
    yield call(getInstallReferrerId);

  const user: SagaReturnType<typeof Api.user.createUser> = yield call(
    Api.user.createUser,
    {
      firstName: userInfo?.firstName ?? null,
      lastName: userInfo?.lastName ?? null,
      referredBy: installReferrerId,
      email,
      phoneNumber: normalizedNumber,
      phoneNumberHash,
      clientData: {
        phoneNumberIso,
      },
      language: appLocale,
    },
  );

  if (user) {
    yield put(AnalyticsActions.TRACK_SIGN_UP.START.create({user}));
  }

  return user;
}

function* getInstallReferrerId() {
  const installReferrer: SagaReturnType<typeof installReferrerSelector> =
    yield select(installReferrerSelector);
  if (installReferrer) {
    try {
      const {
        data: referrerUser,
      }: SagaReturnType<typeof Api.user.getUserByUsername> = yield call(
        Api.user.getUserByUsername,
        {username: installReferrer},
      );
      return referrerUser.id;
    } catch (error) {
      return null;
    }
  }
  return null;
}
