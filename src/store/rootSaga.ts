// SPDX-License-Identifier: ice License 1.0

import {isApiError, isNetworkError} from '@api/client';
import {isAuthError} from '@services/auth';
import {logError} from '@services/logging';
import {isValidationError} from '@store/errors/validation';
import {AccountActions} from '@store/modules/Account/actions';
import {appCommonWatchers} from '@store/modules/AppCommon/sagas';
import {linkingWatchers} from '@store/modules/Linking/sagas';
import {permissionsWatchers} from '@store/modules/Permissions/sagas';
import {pushNotificationsWatchers} from '@store/modules/PushNotifications/sagas';
import {statsWatchers} from '@store/modules/Stats/sagas';
import {AppState} from 'react-native';
import {SagaIterator} from 'redux-saga';
import {all, call, cancel, spawn, take} from 'redux-saga/effects';

const watchers = [
  ...appCommonWatchers,
  ...linkingWatchers,
  ...pushNotificationsWatchers,
  ...statsWatchers,
  ...permissionsWatchers,
];

export function* rootSaga(): SagaIterator {
  const spawnedWatchers = yield all([
    ...watchers.map(watcher => {
      return spawn(function* () {
        while (true) {
          try {
            yield call(function* () {
              yield watcher;
            });
            break;
          } catch (error) {
            if (shouldLog(error)) {
              logError(error);
            }
          }
        }
      });
    }),
  ]);
  /**
   * Restarting sagas on logout to prevent cases
   * when running sagas can set user related data
   * to the store after logout happened
   */
  yield take(AccountActions.SIGN_OUT.SUCCESS.type);
  yield cancel(spawnedWatchers);
  yield call(rootSaga);
}

/**
 * Check if we need to log the error
 */
const shouldLog = (error: unknown) => {
  /**
   * API errors
   */
  if (isApiError(error)) {
    return false;
  }

  /**
   * All auth requests are 4xx
   */
  if (isAuthError(error)) {
    return false;
  }

  /**
   * Some started requests may fail when app goes background
   */
  if (isNetworkError(error) && AppState.currentState !== 'active') {
    return false;
  }

  /**
   * Local validation errors, e.g. "invalid phone number"
   */
  if (isValidationError(error)) {
    return false;
  }

  return true;
};
