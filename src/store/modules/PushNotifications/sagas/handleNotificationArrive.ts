// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {LinkingActions} from '@store/modules/Linking/actions';
import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {CHANNEL_ID} from '@store/modules/PushNotifications/constants';
import {waitForSelector} from '@store/utils/sagas/effects';
import {call, put} from 'redux-saga/effects';
import {isAndroid} from 'rn-units';

const actionCreator = PushNotificationsActions.NOTIFICATION_ARRIVE.STATE.create;

export function* handleNotificationArriveSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {message} = action.payload;

  yield call(waitForSelector, isSplashHiddenSelector);

  if (isAndroid) {
    if (message?.notification) {
      yield call(notifee.displayNotification, {
        title: message.notification.title,
        body: message.notification.body,
        data: message?.data,
        android: {
          channelId: CHANNEL_ID,
          smallIcon: 'ic_stat_notification',
          sound: 'default',
          color: COLORS.primaryLight,
          ...(message.notification.android?.imageUrl
            ? {
                largeIcon: message.notification.android?.imageUrl,
                style: {
                  type: AndroidStyle.BIGPICTURE,
                  picture: message.notification.android?.imageUrl,
                },
              }
            : {}),
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
        },
      });
    }
  } else {
    if (typeof message?.data?.deeplink === 'string') {
      yield put(
        LinkingActions.HANDLE_URL.STATE.create(message.data.deeplink, true),
      );
    }
  }
}
