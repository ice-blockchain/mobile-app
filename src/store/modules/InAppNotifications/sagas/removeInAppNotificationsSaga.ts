// SPDX-License-Identifier: ice License 1.0

import {
  removeAnnouncements,
  removeInAppNotifications,
} from '@services/getStream';
import {InAppNotificationActions} from '@store/modules/InAppNotifications/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator =
  InAppNotificationActions.REMOVE_IN_APP_NOTIFICATIONS.START.create;

export function* removeInAppNotificationsSaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const {notificationIds} = action.payload;
    const notificationsResult: SagaReturnType<typeof removeInAppNotifications> =
      yield call(removeInAppNotifications, notificationIds);
    const announcementsResult: SagaReturnType<typeof removeAnnouncements> =
      yield call(removeAnnouncements, notificationIds);
    if (notificationsResult && announcementsResult) {
      yield put(
        InAppNotificationActions.REMOVE_IN_APP_NOTIFICATIONS.SUCCESS.create({
          notificationIds: notificationIds,
        }),
      );
    }
  } catch (error) {
    yield put(
      InAppNotificationActions.REMOVE_IN_APP_NOTIFICATIONS.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
