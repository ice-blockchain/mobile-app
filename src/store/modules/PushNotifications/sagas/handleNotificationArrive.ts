// SPDX-License-Identifier: ice License 1.0

import {
  isAppActiveSelector,
  isSplashHiddenSelector,
} from '@store/modules/AppCommon/selectors';
import {LinkingActions} from '@store/modules/Linking/actions';
import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {waitForSelector} from '@store/utils/sagas/effects';
import {call, put, select} from 'redux-saga/effects';

const actionCreator = PushNotificationsActions.NOTIFICATION_ARRIVE.STATE.create;

export function* handleNotificationArriveSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {message} = action.payload;

  yield call(waitForSelector, isSplashHiddenSelector);

  const isActive: ReturnType<typeof isAppActiveSelector> = yield select(
    isAppActiveSelector,
  );
  if (message?.data?.deeplink && !isActive) {
    yield put(
      LinkingActions.HANDLE_URL.STATE.create(message?.data?.deeplink, true),
    );
  }
}
