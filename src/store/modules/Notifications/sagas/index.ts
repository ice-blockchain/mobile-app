// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {NotificationActions} from '@store/modules/Notifications/actions';
import {getNotificationSettingsSaga} from '@store/modules/Notifications/sagas/getNotificationSettings';
import {updateNotificationChannel} from '@store/modules/Notifications/sagas/updateNotificationChannel';
import {takeLatest} from 'redux-saga/effects';

export const notificationsWatchers = [
  takeLatest(
    [
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      NotificationActions.GET_NOTIFICATION_SETTINGS.START.type,
    ],
    getNotificationSettingsSaga,
  ),

  takeLatest(
    NotificationActions.UPDATE_NOTIFICATION_CHANNEL.START.type,
    updateNotificationChannel,
  ),
];
