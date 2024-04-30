// SPDX-License-Identifier: ice License 1.0

import {Activity} from '@services/getStream/types';
import {InAppNotificationActions} from '@store/modules/InAppNotifications/actions';
import {getErrorMessage} from '@utils/errors';
import {put} from 'redux-saga/effects';

const actionCreator =
  InAppNotificationActions.IN_APP_NOTIFICATIONS_ADD.STATE.create;

export function* addInAppNotificationsSaga(
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
      InAppNotificationActions.IN_APP_NOTIFICATIONS_LOAD.SUCCESS.create({
        notifications: activities,
        hasMore: false, //TODO: handle pagination
        isRefresh: false,
      }),
    );
  } catch (error) {
    yield put(
      InAppNotificationActions.IN_APP_NOTIFICATIONS_LOAD.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
