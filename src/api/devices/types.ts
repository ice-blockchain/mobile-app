// SPDX-License-Identifier: BUSL-1.1

export interface DeviceSettings {
  deviceUniqueId: string;
  language: string;
  notificationSettings: NotificationChannels;
  userId: string;
}

export interface NotificationChannels {
  email: boolean;
  push: boolean;
}

export interface DeviceLocation {
  city: string;
  country: string;
}

export interface DeviceMetadata {
  apiLevel: number;
  baseOS: string | null;
  bootloader: string | null;
  brand: string | null;
  buildId: string;
  carrier: string | null;
  codename: string | null;
  device: string | null;
  deviceId: string | null;
  deviceName: string | null;
  deviceType: string | null;
  deviceUniqueId: string;
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
  userId: string;
}

export interface DeviceId {
  userId: string;
  deviceUniqueId: string;
}
