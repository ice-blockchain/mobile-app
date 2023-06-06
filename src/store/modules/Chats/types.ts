// SPDX-License-Identifier: ice License 1.0

export type ChatSourceType = 'channel' | 'group' | 'private';
export type ExploreDataType = 'channel' | 'group';
export type MessageStatusType = 'sent' | 'received' | 'seen';

export type ChatDataType = 'chats' | 'users' | 'explore';

export type MessageData = {
  id: number;
  icon: string;
  sourceName: string;
  lastMessage: string;
  minutesAgo: number;
  sourceType: ChatSourceType;
  unreadMessages: number;
  isVerified?: boolean;
  lastMessageStatus: MessageStatusType;
};

export type ChatUserData = {
  id: number;
  icon: string;
  username: string;
  lastSeenMinutesAgo: number;
};

export type ExploreData = {
  id: number;
  icon: string;
  type: ExploreDataType;
  displayName: string;
  membersNumber: number;
  isSubscribed?: boolean;
  isVerified?: boolean;
};
