// SPDX-License-Identifier: ice License 1.0

import {
  NotificationDeliveryChannel,
  NotificationDomainToggle,
  NotificationSettings,
} from '@api/notifications/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_NOTIFICATION_SETTINGS = createAction('GET_NOTIFICATION_SETTINGS', {
  START: true,
  SUCCESS: (settings: NotificationSettings) => ({settings}),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const UPDATE_NOTIFICATION_CHANNEL = createAction(
  'UPDATE_NOTIFICATION_CHANNEL',
  {
    START: (
      notificationChannel: NotificationDomainToggle,
      notificationDeliveryChannel: NotificationDeliveryChannel,
    ) => ({notificationChannel, notificationDeliveryChannel}),
    SUCCESS: (
      notificationChannel: NotificationDomainToggle,
      notificationDeliveryChannel: NotificationDeliveryChannel,
    ) => ({notificationChannel, notificationDeliveryChannel}),
    FAILED: (errorMessage: string) => ({errorMessage}),
  },
);

export const NotificationActions = Object.freeze({
  GET_NOTIFICATION_SETTINGS,
  UPDATE_NOTIFICATION_CHANNEL,
});
