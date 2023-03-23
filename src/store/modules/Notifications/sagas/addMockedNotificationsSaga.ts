// SPDX-License-Identifier: ice License 1.0

import {mockNotifications} from '@services/getstream';
import {NotificationActions} from '@store/modules/Notifications/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* addMockedNotificationsSaga() {
  try {
    const notificationsData: SagaReturnType<typeof mockNotifications> =
      yield call(mockNotifications);
    if (notificationsData) {
      yield put(
        NotificationActions.NOTIFICATIONS_LOAD.START.create({isRefresh: true}),
      );
    }
  } catch (error) {
    yield put(
      NotificationActions.NOTIFICATIONS_LOAD.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
