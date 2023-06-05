// SPDX-License-Identifier: ice License 1.0

import {isApiError, isNetworkError} from '@api/client';
import {isAuthError} from '@services/auth';
import {logError} from '@services/logging';
import {AccountActions} from '@store/modules/Account/actions';
import {rootAnalyticsSaga} from '@store/modules/Analytics/sagas';
import {rootNotificationsSaga} from '@store/modules/InAppNotifications/sagas';
import {rootLinkingSaga} from '@store/modules/Linking/sagas';
import {rootPushNotificationsSaga} from '@store/modules/PushNotifications/sagas';
import {rootStatsSaga} from '@store/modules/Stats/sagas';
import {rootStatusNoticeSaga} from '@store/modules/StatusNotice/sagas';
import {AppState} from 'react-native';
import {SagaIterator} from 'redux-saga';
import {all, call, cancel, spawn, take} from 'redux-saga/effects';

import {rootAuthSaga} from './modules/Account/sagas';
import {rootAchievementsSaga} from './modules/Achievements/sagas';
import {rootAppCommonSaga} from './modules/AppCommon/sagas';
import {rootAppUpdateSaga} from './modules/AppUpdate/sagas';
import {rootCollectionsSaga} from './modules/Collections/sagas';
import {rootTeamSaga} from './modules/Contacts/sagas';
import {rootDevicesSaga} from './modules/Devices/sagas';
import {rootNewsSaga} from './modules/News/sagas';
import {rootPermissionsSaga} from './modules/Permissions/sagas';
import {rootRateAppSaga} from './modules/RateApp/sagas';
import {rootReferralsSaga} from './modules/Referrals/sagas';
import {rootTokenomicsSaga} from './modules/Tokenomics/sagas';
import {rootUsersSaga} from './modules/Users/sagas';
import {rootValidationSaga} from './modules/Validation/sagas';
import {rootWalkthroughSaga} from './modules/Walkthrough/sagas';

export function* rootSaga(): SagaIterator {
  const sagas = [
    rootAuthSaga,
    rootNewsSaga,
    rootStatsSaga,
    rootAnalyticsSaga,
    rootPermissionsSaga,
    rootReferralsSaga,
    rootCollectionsSaga,
    rootTeamSaga,
    rootValidationSaga,
    rootDevicesSaga,
    rootLinkingSaga,
    rootPushNotificationsSaga,
    rootNotificationsSaga,
    rootAppCommonSaga,
    rootUsersSaga,
    rootTokenomicsSaga,
    rootStatusNoticeSaga,
    rootRateAppSaga,
    rootWalkthroughSaga,
    rootAchievementsSaga,
    rootAppUpdateSaga,
  ];
  const spawnedSagas = yield all([
    ...sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (error) {
            if (shouldLog(error)) {
              logError(error);
            }
          }
        }
      }),
    ),
  ]);
  /**
   * Restarting sagas on logout to prevent cases
   * when running sagas can set user related data
   * to the store after logout happened
   */
  yield take(AccountActions.SIGN_OUT.SUCCESS.type);
  yield cancel(spawnedSagas);
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

  return true;
};
