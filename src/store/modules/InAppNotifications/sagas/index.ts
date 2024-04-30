// SPDX-License-Identifier: ice License 1.0

import {InAppNotificationActions} from '@store/modules/InAppNotifications/actions';
import {addInAppNotificationsSaga} from '@store/modules/InAppNotifications/sagas/addInAppNotificationsSaga';
import {addMockedAllActivitiesSaga} from '@store/modules/InAppNotifications/sagas/addMockedAllActivitiesSaga';
import {addMockedAnnouncementsSaga} from '@store/modules/InAppNotifications/sagas/addMockedAnnouncementsSaga';
import {addMockedInAppNotificationsSaga} from '@store/modules/InAppNotifications/sagas/addMockedInAppNotificationsSaga';
import {loadInAppNotificationsSaga} from '@store/modules/InAppNotifications/sagas/loadInAppNotificationsSaga';
import {removeInAppNotificationsSaga} from '@store/modules/InAppNotifications/sagas/removeInAppNotificationsSaga';
import {takeLeading} from 'redux-saga/effects';

export const inAppNotificationsWatchers = [
  takeLeading(
    InAppNotificationActions.IN_APP_NOTIFICATIONS_LOAD.START.type,
    loadInAppNotificationsSaga,
  ),
  takeLeading(
    InAppNotificationActions.REMOVE_IN_APP_NOTIFICATIONS.START.type,
    removeInAppNotificationsSaga,
  ),
  takeLeading(
    InAppNotificationActions.ADD_IN_APP_MOCKED_NOTIFICATIONS.STATE.type,
    addMockedInAppNotificationsSaga,
  ),
  takeLeading(
    InAppNotificationActions.ADD_MOCKED_ANNOUNCEMENTS.STATE.type,
    addMockedAnnouncementsSaga,
  ),
  takeLeading(
    InAppNotificationActions.ADD_IN_APP_NOTIFICATIONS_AND_ANNOUNCEMENTS.STATE
      .type,
    addMockedAllActivitiesSaga,
  ),
  takeLeading(
    InAppNotificationActions.IN_APP_NOTIFICATIONS_ADD.STATE.type,
    addInAppNotificationsSaga,
  ),
];
