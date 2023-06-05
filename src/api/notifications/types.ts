// SPDX-License-Identifier: ice License 1.0

export type NotificationDeliveryChannel = 'email' | 'push';

export type NotificationDomain = string;

export type NotificationDomainToggle = {
  type: NotificationDomain;
  enabled: boolean;
};

export type NotificationDomainToggles = Array<NotificationDomainToggle>;

export interface NotificationSettings {
  disableAllNotifications: boolean;
  pushNotificationSettings: NotificationDomainToggles;
  emailNotificationSettings: NotificationDomainToggles;
}
