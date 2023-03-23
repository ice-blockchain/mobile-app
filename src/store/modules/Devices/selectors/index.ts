// SPDX-License-Identifier: ice License 1.0

import {DISABLE_ALL_NOTIFICATION_DOMAIN} from '@api/devices/constants';
import {NotificationDeliveryChannel} from '@api/devices/types';
import {RootState} from '@store/rootReducer';

export const deviceUniqueIdSelector = (state: RootState) =>
  state.devices.deviceUniqueId as string;

export const deviceLocationSelector = (state: RootState) =>
  state.devices.location;

export const lastMetadataUpdateSelector = (state: RootState) =>
  state.devices.lastMetadataUpdateAt;

export const emailNotificationByTypeSelector = (state: RootState) => {
  return state.devices.settings?.emailNotificationSettings;
};

export const pushNotificationByTypeSelector = (state: RootState) => {
  return state.devices.settings?.pushNotificationSettings;
};

export const enabledNotificationDomainsSelector =
  (channel: NotificationDeliveryChannel) => (state: RootState) => {
    const notificationDomainToggles =
      channel === 'push'
        ? state.devices.settings?.pushNotificationSettings
        : state.devices.settings?.emailNotificationSettings;
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
