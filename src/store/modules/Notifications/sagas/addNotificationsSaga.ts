// SPDX-License-Identifier: ice License 1.0

import {Activity} from '@api/notifications/types';
import {NotificationActions} from '@store/modules/Notifications/actions';
import {getErrorMessage} from '@utils/errors';
import {put} from 'redux-saga/effects';

const actionCreator = NotificationActions.NOTIFICATIONS_ADD.STATE.create;

export function* addNotificationsSaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const {notifications} = action.payload;

    const activities = notifications.reduce<Record<string, Activity>>(
      (acc, activity) => {
        acc[activity.id] = activity;
        return acc;
      },
      {},
    );

    yield put(
      NotificationActions.NOTIFICATIONS_LOAD.SUCCESS.create({
        notifications: activities,
        hasMore: false, //TODO: handle pagination
        isRefresh: false,
      }),
    );
  } catch (error) {
    yield put(
      NotificationActions.NOTIFICATIONS_LOAD.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
