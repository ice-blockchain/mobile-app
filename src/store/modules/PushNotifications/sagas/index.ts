// SPDX-License-Identifier: ice License 1.0

import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {handleDataMessageSaga} from '@store/modules/PushNotifications/sagas/handleDataMessageSaga';
import {handleNotificationArriveSaga} from '@store/modules/PushNotifications/sagas/handleNotificationArrive';
import {handleNotificationPressSaga} from '@store/modules/PushNotifications/sagas/handleNotificationPress';
import {takeEvery, takeLatest} from 'redux-saga/effects';

export const pushNotificationsWatchers = [
  takeLatest(
    PushNotificationsActions.NOTIFICATION_PRESS.STATE.type,
    handleNotificationPressSaga,
  ),
  takeEvery(
    PushNotificationsActions.NOTIFICATION_ARRIVE.STATE.type,
    handleNotificationArriveSaga,
  ),
  takeEvery(
    PushNotificationsActions.DATA_MESSAGE_ARRIVE.STATE.type,
    handleDataMessageSaga,
  ),
];
