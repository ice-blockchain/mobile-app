// SPDX-License-Identifier: ice License 1.0

import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {createAction} from '@store/utils/actions/createAction';

const NOTIFICATION_PRESS = createAction('NOTIFICATION_PRESS', {
  STATE: (payload: {data?: {deeplink?: string}}) => payload,
});

const NOTIFICATION_ARRIVE = createAction('NOTIFICATION_ARRIVE', {
  STATE: (payload: {message?: FirebaseMessagingTypes.RemoteMessage}) => payload,
});

const DELAYED_NOTIFICATION_ARRIVE = createAction(
  'DELAYED_NOTIFICATION_ARRIVE',
  {
    STATE: (payload: {message: FirebaseMessagingTypes.RemoteMessage}) =>
      payload,
  },
);

export const PushNotificationsActions = Object.freeze({
  NOTIFICATION_PRESS,
  NOTIFICATION_ARRIVE,
  DELAYED_NOTIFICATION_ARRIVE,
});
