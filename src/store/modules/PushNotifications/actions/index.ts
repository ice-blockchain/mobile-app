// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

const NOTIFICATION_PRESS = createAction('NOTIFICATION_PRESS', {
  STATE: (payload: {data?: {deeplink?: string}}) => payload,
});

const NOTIFICATION_ARRIVE = createAction('NOTIFICATION_ARRIVE', {
  STATE: (payload: {data?: {deeplink?: string}}) => payload,
});

export const PushNotificationsActions = Object.freeze({
  NOTIFICATION_PRESS,
  NOTIFICATION_ARRIVE,
});
