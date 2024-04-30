// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {
  NotificationDeliveryChannel,
  NotificationDomainToggles,
} from '@api/notifications/types';

/**
 * Returns the user's list of notification channel toggles for the provided notificationChannel.
 */

export async function getUserNotificationChannels(
  notificationDeliveryChannel: NotificationDeliveryChannel,
) {
  const {data: response} = await get<NotificationDomainToggles>(
    `/notification-channels/${notificationDeliveryChannel}/toggles`,
  );
  const notificationChannels: NotificationDomainToggles = [];
  response.forEach(({type, enabled}) => {
    notificationChannels.push({
      enabled,
      type: type.toLowerCase(),
    });
  });
  return notificationChannels;
}
