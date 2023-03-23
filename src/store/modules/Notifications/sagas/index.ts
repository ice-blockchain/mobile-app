// SPDX-License-Identifier: ice License 1.0

import {NotificationActions} from '@store/modules/Notifications/actions';
import {addMockedAllActivitiesSaga} from '@store/modules/Notifications/sagas/addMockedAllActivitiesSaga';
import {addMockedAnnouncementsSaga} from '@store/modules/Notifications/sagas/addMockedAnnouncementsSaga';
import {addMockedNotificationsSaga} from '@store/modules/Notifications/sagas/addMockedNotificationsSaga';
import {addNotificationsSaga} from '@store/modules/Notifications/sagas/addNotificationsSaga';
import {loadNotificationsSaga} from '@store/modules/Notifications/sagas/loadNotificationsSaga';
import {removeNotificationsSaga} from '@store/modules/Notifications/sagas/removeNotificationsSaga';
import {all, takeLeading} from 'redux-saga/effects';

export function* rootNotificationsSaga() {
  yield all([
    takeLeading(
      NotificationActions.NOTIFICATIONS_LOAD.START.type,
      loadNotificationsSaga,
    ),
    takeLeading(
      NotificationActions.REMOVE_NOTIFICATIONS.START.type,
      removeNotificationsSaga,
    ),
    takeLeading(
      NotificationActions.ADD_MOCKED_NOTIFICATIONS.STATE.type,
      addMockedNotificationsSaga,
    ),
    takeLeading(
      NotificationActions.ADD_MOCKED_ANNOUNCEMENTS.STATE.type,
      addMockedAnnouncementsSaga,
    ),
    takeLeading(
      NotificationActions.ADD_NOTIFICATIONS_AND_ANNOUNCEMENTS.STATE.type,
      addMockedAllActivitiesSaga,
    ),
    takeLeading(
      NotificationActions.NOTIFICATIONS_ADD.STATE.type,
      addNotificationsSaga,
    ),
  ]);
}
