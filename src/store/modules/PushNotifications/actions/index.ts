// SPDX-License-Identifier: ice License 1.0

import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {createAction} from '@store/utils/actions/createAction';

const NOTIFICATION_PRESS = createAction('NOTIFICATION_PRESS', {
  STATE: (payload: {message: FirebaseMessagingTypes.RemoteMessage | null}) =>
    payload,
});

const NOTIFICATION_ARRIVE = createAction('NOTIFICATION_ARRIVE', {
  STATE: (payload: {message: FirebaseMessagingTypes.RemoteMessage | null}) =>
    payload,
});

export const PushNotificationsActions = Object.freeze({
  NOTIFICATION_PRESS,
  NOTIFICATION_ARRIVE,
});
