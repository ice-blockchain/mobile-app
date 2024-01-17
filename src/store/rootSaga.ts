// SPDX-License-Identifier: ice License 1.0

import {isApiError, isNetworkError} from '@api/client';
import {isAuthError} from '@services/auth';
import {logError} from '@services/logging';
import {isValidationError} from '@store/errors/validation';
import {AccountActions} from '@store/modules/Account/actions';
import {authWatchers} from '@store/modules/Account/sagas';
import {achievementsWatchers} from '@store/modules/Achievements/sagas';
import {analyticsWatchers} from '@store/modules/Analytics/sagas';
import {appCommonWatchers} from '@store/modules/AppCommon/sagas';
import {appUpdateWatchers} from '@store/modules/AppUpdate/sagas';
import {backgroundTasksWatchers} from '@store/modules/BackgroundTasks/sagas';
import {collectionsWatchers} from '@store/modules/Collections/sagas';
import {teamWatchers} from '@store/modules/Contacts/sagas';
import {creativeLibraryWatchers} from '@store/modules/CreativeLibrary/sagas';
import {devicesWatchers} from '@store/modules/Devices/sagas';
import {faceRecognitionWatchers} from '@store/modules/FaceRecognition/sagas';
import {inAppNotificationsWatchers} from '@store/modules/InAppNotifications/sagas';
import {linkingWatchers} from '@store/modules/Linking/sagas';
import {newsWatchers} from '@store/modules/News/sagas';
import {notificationsWatchers} from '@store/modules/Notifications/sagas';
import {permissionsWatchers} from '@store/modules/Permissions/sagas';
import {pushNotificationsWatchers} from '@store/modules/PushNotifications/sagas';
import {quizWatchers} from '@store/modules/Quiz/sagas';
import {rateAppWatchers} from '@store/modules/RateApp/sagas';
import {referralsWatchers} from '@store/modules/Referrals/sagas';
import {socialKycWatchers} from '@store/modules/SocialKyc/sagas';
import {socialsWatchers} from '@store/modules/Socials/sagas';
import {statsWatchers} from '@store/modules/Stats/sagas';
import {statusNoticeWatchers} from '@store/modules/StatusNotice/sagas';
import {tokenomicsWatchers} from '@store/modules/Tokenomics/sagas';
import {usersWatchers} from '@store/modules/Users/sagas';
import {validationWatchers} from '@store/modules/Validation/sagas';
import {walkthroughWatchers} from '@store/modules/Walkthrough/sagas';
import {AppState} from 'react-native';
import {SagaIterator} from 'redux-saga';
import {all, call, cancel, spawn, take} from 'redux-saga/effects';

const watchers = [
  ...authWatchers,
  ...newsWatchers,
  ...statsWatchers,
  ...analyticsWatchers,
  ...faceRecognitionWatchers,
  ...permissionsWatchers,
  ...referralsWatchers,
  ...collectionsWatchers,
  ...teamWatchers,
  ...validationWatchers,
  ...devicesWatchers,
  ...linkingWatchers,
  ...socialKycWatchers,
  ...pushNotificationsWatchers,
  ...appCommonWatchers,
  ...creativeLibraryWatchers,
  ...usersWatchers,
  ...tokenomicsWatchers,
  ...statusNoticeWatchers,
  ...rateAppWatchers,
  ...walkthroughWatchers,
  ...achievementsWatchers,
  ...appUpdateWatchers,
  ...notificationsWatchers,
  ...inAppNotificationsWatchers,
  ...backgroundTasksWatchers,
  ...socialsWatchers,
  ...quizWatchers,
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
