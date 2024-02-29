// SPDX-License-Identifier: ice License 1.0

import {appCommonWatchers} from '@store/modules/AppCommon/sagas';
import {linkingWatchers} from '@store/modules/Linking/sagas';
import {permissionsWatchers} from '@store/modules/Permissions/sagas';
import {pushNotificationsWatchers} from '@store/modules/PushNotifications/sagas';
import {statsWatchers} from '@store/modules/Stats/sagas';
import {SagaIterator} from 'redux-saga';
import {all, call, spawn} from 'redux-saga/effects';

const watchers = [
  ...appCommonWatchers,
  ...linkingWatchers,
  ...pushNotificationsWatchers,
  ...statsWatchers,
  ...permissionsWatchers,
];

export function* rootSaga(): SagaIterator {
  yield all([
    ...watchers.map(watcher => {
      return spawn(function* () {
        while (true) {
          try {
            yield call(function* () {
              yield watcher;
            });
            break;
          } catch {}
        }
      });
    }),
  ]);
}
