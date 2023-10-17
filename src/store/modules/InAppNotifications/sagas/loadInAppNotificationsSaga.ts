// SPDX-License-Identifier: ice License 1.0

import {loadAnnouncements, loadInAppNotifications} from '@services/getStream';
import {Activity} from '@services/getStream/types';
import {InAppNotificationActions} from '@store/modules/InAppNotifications/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator =
  InAppNotificationActions.IN_APP_NOTIFICATIONS_LOAD.START.create;

export function* loadInAppNotificationsSaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const {isRefresh} = action.payload;
    const notificationsData: SagaReturnType<typeof loadInAppNotifications> =
      yield call(loadInAppNotifications);
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
      InAppNotificationActions.IN_APP_NOTIFICATIONS_LOAD.SUCCESS.create({
        notifications: activities,
        hasMore: false, //TODO: handle pagination
        isRefresh: isRefresh,
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
