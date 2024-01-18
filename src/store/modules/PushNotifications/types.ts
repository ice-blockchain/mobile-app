// SPDX-License-Identifier: ice License 1.0

export type DataMessageType = 'delayed';

export type DelayedDataMessageData = {
  title: string;
  body: string;
  minDelaySec?: string;
  maxDelaySec?: string;
  imageUrl?: string;
};
