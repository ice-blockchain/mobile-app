// SPDX-License-Identifier: ice License 1.0

import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {handleNotificationArriveSaga} from '@store/modules/PushNotifications/sagas/handleNotificationArrive';
import {handleNotificationPressSaga} from '@store/modules/PushNotifications/sagas/handleNotificationPress';
import {all, takeEvery, takeLatest} from 'redux-saga/effects';

export function* rootPushNotificationsSaga() {
  yield all([
    takeLatest(
      PushNotificationsActions.NOTIFICATION_PRESS.STATE.type,
      handleNotificationPressSaga,
    ),
    takeEvery(
      PushNotificationsActions.NOTIFICATION_ARRIVE.STATE.type,
      handleNotificationArriveSaga,
    ),
  ]);
}
