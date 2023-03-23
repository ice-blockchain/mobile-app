// SPDX-License-Identifier: ice License 1.0

export type NotificationDeliveryChannel = 'email' | 'push';

export type NotificationDomain = string;

export type NotificationDomainToggle = {
  type: NotificationDomain;
  enabled: boolean;
};

export type NotificationDomainToggles = Array<NotificationDomainToggle>;
export interface DeviceSettings extends DeviceId {
  disableAllNotifications: boolean;
  pushNotificationSettings: NotificationDomainToggles;
  emailNotificationSettings: NotificationDomainToggles;
}

export interface DeviceLocation {
  city: string;
  country: string;
}

export interface DeviceMetadata extends DeviceId {
  apiLevel: number;
  baseOS: string | null;
  bootloader: string | null;
  brand: string | null;
  buildId: string;
  carrier: string | null;
  codename: string | null;
  device: string | null;
  deviceId: string;
  deviceName: string | null;
  deviceType: string | null;
  emulator: boolean;
  fingerprint: string | null;
  firstInstallTime: number;
  hardware: string | null;
  installerPackageName: string | null;
  instanceId: string | null;
  lastUpdateTime: number;
  manufacturer: string | null;
  pinOrFingerprintSet: boolean;
  product: string | null;
  pushNotificationToken: string | null;
  readableVersion: string | null;
  systemName: string | null;
  systemVersion: string | null;
  tablet: boolean;
  tags: string | null;
  type: string | null;
  userAgent: string | null;
  tz: string;
}

export interface DeviceId {
  userId: string;
  deviceUniqueId: string;
}
