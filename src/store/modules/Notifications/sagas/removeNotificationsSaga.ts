// SPDX-License-Identifier: ice License 1.0

import {removeAnnouncements, removeNotifications} from '@services/getstream';
import {NotificationActions} from '@store/modules/Notifications/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = NotificationActions.REMOVE_NOTIFICATIONS.START.create;

export function* removeNotificationsSaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const {notificationIds} = action.payload;
    const notificationsResult: SagaReturnType<typeof removeNotifications> =
      yield call(removeNotifications, notificationIds);
    const announcementsResult: SagaReturnType<typeof removeAnnouncements> =
      yield call(removeAnnouncements, notificationIds);
    if (notificationsResult && announcementsResult) {
      yield put(
        NotificationActions.REMOVE_NOTIFICATIONS.SUCCESS.create({
          notificationIds: notificationIds,
        }),
      );
    }
  } catch (error) {
    yield put(
      NotificationActions.REMOVE_NOTIFICATIONS.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
