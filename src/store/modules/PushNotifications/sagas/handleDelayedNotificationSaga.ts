// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  Notification,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {dayjs} from '@services/dayjs';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {CHANNEL_ID} from '@store/modules/PushNotifications/constants';
import {DelayedNotificationData} from '@store/modules/PushNotifications/types';
import {call, SagaReturnType, select} from 'redux-saga/effects';

export function* handleDelayedNotificationSaga({
  payload: {message},
}: ReturnType<
  typeof PushNotificationsActions.DELAYED_NOTIFICATION_ARRIVE.STATE.create
>) {
  console.log('handleDelayedNotificationSaga');

  if (message.data?.delayed !== 'true') {
    throw new Error('Message is not delayed or data is null');
  }

  const {title, body, imageUrl, minDelaySec, maxDelaySec} =
    message.data as DelayedNotificationData;

  const minDelay = parseInt(minDelaySec, 10);
  const maxDelay = parseInt(maxDelaySec, 10);

  if (isNaN(minDelay) || isNaN(maxDelay)) {
    throw new Error(
      `Delayed message min / max delay is incorrect, minDelay=${minDelaySec} maxDelay=${maxDelaySec}`,
    );
  }

  const isAppActive: SagaReturnType<typeof isAppActiveSelector> = yield select(
    isAppActiveSelector,
  );

  const delaySec = isAppActive
    ? 0
    : Math.round(minDelay + Math.random() * maxDelay);

  const notification: Notification = {
    title: title,
    body: body + ' ' + `(Delayed by ${delaySec} sec)`,
    data: message.data,
    android: {
      channelId: CHANNEL_ID,
      smallIcon: 'ic_stat_notification',
      sound: 'default',
      color: COLORS.primaryLight,
      ...(imageUrl
        ? {
            largeIcon: imageUrl,
            style: {type: AndroidStyle.BIGPICTURE, picture: imageUrl},
          }
        : {}),
      importance: AndroidImportance.HIGH,
    },
  };

  if (delaySec) {
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: dayjs().add(delaySec, 's').valueOf(),
    };
    yield call(notifee.createTriggerNotification, notification, trigger);
  } else {
    yield call(notifee.displayNotification, notification);
  }
}
