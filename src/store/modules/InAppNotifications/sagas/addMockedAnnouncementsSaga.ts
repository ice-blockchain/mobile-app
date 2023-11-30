// SPDX-License-Identifier: ice License 1.0

import {mockAnnouncements} from '@services/getStream';
import {InAppNotificationActions} from '@store/modules/InAppNotifications/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* addMockedAnnouncementsSaga() {
  try {
    const announcementsData: SagaReturnType<typeof mockAnnouncements> =
      yield call(mockAnnouncements);
    if (announcementsData) {
      yield put(
        InAppNotificationActions.IN_APP_NOTIFICATIONS_LOAD.START.create({
          isRefresh: true,
        }),
      );
    }
  } catch (error) {
    yield put(
      InAppNotificationActions.IN_APP_NOTIFICATIONS_LOAD.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
