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
import {logError} from '@services/logging';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {CHANNEL_ID} from '@store/modules/PushNotifications/constants';
import {
  DataMessageType,
  DelayedDataMessageData,
} from '@store/modules/PushNotifications/types';
import {isDataOnlyMessage} from '@store/modules/PushNotifications/utils/isDataOnlyMessage';
import {call, SagaReturnType, select} from 'redux-saga/effects';

export function* handleDataMessageSaga({
  payload: {message},
}: ReturnType<
  typeof PushNotificationsActions.DATA_MESSAGE_ARRIVE.STATE.create
>) {
  if (!isDataOnlyMessage(message)) {
    throw new Error('Message is not data-only');
  }

  switch (message.data?.type as DataMessageType) {
    case 'delayed':
      yield call(handleDelayedDataMessage, {
        data: message.data as DelayedDataMessageData,
      });
      break;
    default:
      logError(`Unable to handle data message type: ${message.data?.type}`);
  }
}

function* handleDelayedDataMessage({data}: {data: DelayedDataMessageData}) {
  const {title, body, imageUrl, minDelaySec, maxDelaySec} = data;

  const minDelay = minDelaySec ? parseInt(minDelaySec, 10) : 0;
  const maxDelay = maxDelaySec ? parseInt(maxDelaySec, 10) : 0;

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
    : Math.round(minDelay + Math.random() * (maxDelay - minDelay));

  const notification: Notification = {
    title: title,
    body: body + ' ' + `(Delayed by ${delaySec} sec)`,
    data,
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
      pressAction: {
        id: 'default',
      },
    },
  };

  if (delaySec > 0) {
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: dayjs().add(delaySec, 's').valueOf(),
    };
    yield call(notifee.createTriggerNotification, notification, trigger);
  } else {
    yield call(notifee.displayNotification, notification);
  }
}
