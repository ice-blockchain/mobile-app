// SPDX-License-Identifier: ice License 1.0

import {Activity} from '@api/notifications/types';
import {loadAnnouncements, loadNotifications} from '@services/getstream';
import {NotificationActions} from '@store/modules/Notifications/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = NotificationActions.NOTIFICATIONS_LOAD.START.create;

export function* loadNotificationsSaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const {isRefresh} = action.payload;
    const notificationsData: SagaReturnType<typeof loadNotifications> =
      yield call(loadNotifications);
    const announcementsData: SagaReturnType<typeof loadAnnouncements> =
      yield call(loadAnnouncements);

    let allActivities: Activity[] = [];

    if (notificationsData && notificationsData.results) {
      notificationsData.results.forEach(result => {
        if (result.activities) {
          allActivities = allActivities.concat(result.activities as Activity[]);
        }
      });
    }

    if (announcementsData && announcementsData.results) {
      announcementsData.results.forEach(result => {
        if (result.activities) {
          allActivities = allActivities.concat(result.activities as Activity[]);
        }
      });
    }

    const activities = allActivities.reduce<Record<string, Activity>>(
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
        isRefresh: isRefresh,
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
