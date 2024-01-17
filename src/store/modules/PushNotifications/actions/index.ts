// SPDX-License-Identifier: ice License 1.0

import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {createAction} from '@store/utils/actions/createAction';

const NOTIFICATION_PRESS = createAction('NOTIFICATION_PRESS', {
  STATE: (payload: {data?: {deeplink?: string}}) => payload,
});

const NOTIFICATION_ARRIVE = createAction('NOTIFICATION_ARRIVE', {
  STATE: (payload: {message?: FirebaseMessagingTypes.RemoteMessage}) => payload,
});

const DATA_MESSAGE_ARRIVE = createAction('DATA_MESSAGE_ARRIVE', {
  STATE: (payload: {
    message: FirebaseMessagingTypes.RemoteMessage;
    finishTask?: () => void;
  }) => payload,
});

export const PushNotificationsActions = Object.freeze({
  NOTIFICATION_PRESS,
  NOTIFICATION_ARRIVE,
  DATA_MESSAGE_ARRIVE,
});
