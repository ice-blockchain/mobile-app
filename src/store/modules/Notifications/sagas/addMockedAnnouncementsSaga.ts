// SPDX-License-Identifier: ice License 1.0

import {mockAnnouncements} from '@services/getstream';
import {NotificationActions} from '@store/modules/Notifications/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* addMockedAnnouncementsSaga() {
  try {
    const announcementsData: SagaReturnType<typeof mockAnnouncements> =
      yield call(mockAnnouncements);
    if (announcementsData) {
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
