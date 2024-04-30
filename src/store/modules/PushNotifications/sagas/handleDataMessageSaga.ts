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
import {PushNotificationsActions} from '@store/modules/PushNotifications/actions';
import {CHANNEL_ID} from '@store/modules/PushNotifications/constants';
import {
  DataMessageType,
  DelayedDataMessageData,
} from '@store/modules/PushNotifications/types';
import {isDataOnlyMessage} from '@store/modules/PushNotifications/utils/isDataOnlyMessage';
import {AppState} from 'react-native';
import {call} from 'redux-saga/effects';

export function* handleDataMessageSaga({
  payload: {message, finishTask},
}: ReturnType<
  typeof PushNotificationsActions.DATA_MESSAGE_ARRIVE.STATE.create
>) {
  try {
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
  } finally {
    if (finishTask) {
      yield call(finishTask);
    }
  }
}

/**
 * WARNING: Do not use `put` or `select` effects here since this saga
 * is called in detached mode, if the app is in background state.
 * The goal for that is to prevent app initialization, thereby
 * avoid unnecessary backend / firebase calls.
 */
function* handleDelayedDataMessage({data}: {data: DelayedDataMessageData}) {
  const {title, body, imageUrl, minDelaySec, maxDelaySec} = data;

  const minDelay = minDelaySec ? parseInt(minDelaySec, 10) : 0;
  const maxDelay = maxDelaySec ? parseInt(maxDelaySec, 10) : 0;

  if (isNaN(minDelay) || isNaN(maxDelay)) {
    throw new Error(
      `Delayed message min / max delay is incorrect, minDelay=${minDelaySec} maxDelay=${maxDelaySec}`,
    );
  }

  const delaySec =
    AppState.currentState === 'active'
      ? 0
      : Math.round(minDelay + Math.random() * (maxDelay - minDelay));

  const notification: Notification = {
    title,
    body,
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
