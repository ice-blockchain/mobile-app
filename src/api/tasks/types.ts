// SPDX-License-Identifier: ice License 1.0

import {ReactNode} from 'react';

export interface Task {
  type: TaskType;
  completed: boolean;
  data?: TaskData;
  Icon?: ReactNode;
}

export type TaskType =
  | 'claim_username'
  | 'start_mining'
  | 'upload_profile_picture'
  | 'follow_us_on_twitter'
  | 'join_telegram'
  | 'invite_friends';

export interface TaskData {
  requiredQuantity?: number;
  telegramUserHandle?: string;
  twitterUserHandle?: string;
}
