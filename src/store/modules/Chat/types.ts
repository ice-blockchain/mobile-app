// SPDX-License-Identifier: ice License 1.0

export type MessageSourceType = 'channel' | 'group' | 'private';
export type MessageStatusType = 'sent' | 'received' | 'seen';

export type MessageData = {
  icon: string;
  sourceName: string;
  lastMessage: string;
  minutesAgo: number;
  sourceType: MessageSourceType;
  unreadMessages: number;
  isVerified?: boolean;
  lastMessageStatus: MessageStatusType;
};

export type ChatUserData = {
  icon: string;
  username: string;
  lastSeenMinutesAgo: number;
};
