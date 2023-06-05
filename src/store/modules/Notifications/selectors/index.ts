// SPDX-License-Identifier: ice License 1.0

import {DISABLE_ALL_NOTIFICATION_DOMAIN} from '@api/notifications/constants';
import {NotificationDeliveryChannel} from '@api/notifications/types';
import {RootState} from '@store/rootReducer';

export const emailNotificationByTypeSelector = (state: RootState) => {
  return state.notifications.settings?.emailNotificationSettings;
};

export const pushNotificationByTypeSelector = (state: RootState) => {
  return state.notifications.settings?.pushNotificationSettings;
};

export const enabledNotificationDomainsSelector =
  (channel: NotificationDeliveryChannel) => (state: RootState) => {
    const notificationDomainToggles =
      channel === 'push'
        ? state.notifications.settings?.pushNotificationSettings
        : state.notifications.settings?.emailNotificationSettings;
    if (notificationDomainToggles) {
      const enabledDomains = [];
      for (const {type, enabled} of notificationDomainToggles) {
        if (type === DISABLE_ALL_NOTIFICATION_DOMAIN) {
          if (enabled) {
            return [];
          }
        } else if (enabled) {
          enabledDomains.push(type);
        }
      }

      return enabledDomains;
    }
    return [];
  };
