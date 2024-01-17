// SPDX-License-Identifier: ice License 1.0

export type DataNotificationType = 'delayed';

export type DelayedNotificationData = {
  title: string;
  body: string;
  minDelaySec?: string;
  maxDelaySec?: string;
  imageUrl?: string;
};
