// SPDX-License-Identifier: ice License 1.0

export type DelayedNotificationData = {
  delayed: 'true';
  title: string;
  body: string;
  minDelaySec: string;
  maxDelaySec: string;
  imageUrl?: string;
};
