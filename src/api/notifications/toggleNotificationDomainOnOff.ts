// SPDX-License-Identifier: ice License 1.0

import {put} from '@api/client';
import {
  NotificationDeliveryChannel,
  NotificationDomainToggle,
} from '@api/notifications/types';

/**
 * Toggles the specific notification channel toggle type on/off.
 */

export function toggleNotificationDomainOnOff(
  {type, enabled}: NotificationDomainToggle,
  notificationChannel: NotificationDeliveryChannel,
) {
  return put(`/notification-channels/${notificationChannel}/toggles/${type}`, {
    enabled,
  });
}
