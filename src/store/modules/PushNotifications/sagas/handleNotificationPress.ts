// SPDX-License-Identifier: ice License 1.0

import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {LinkingActions} from '@store/modules/Linking/actions';
import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {waitForSelector} from '@store/utils/sagas/effects';
import {call, put} from 'redux-saga/effects';

const actionCreator = PushNotificationsActions.NOTIFICATION_PRESS.STATE.create;

export function* handleNotificationPressSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {data} = action.payload;

  yield call(waitForSelector, isSplashHiddenSelector);

  if (data?.deeplink) {
    yield put(LinkingActions.HANDLE_URL.STATE.create(data?.deeplink, true));
  }
}
