// SPDX-License-Identifier: ice License 1.0

import {put} from '@api/client';
import {TaskType} from '@api/tasks/types';

interface TaskData {
  telegramUserHandle?: string;
  twitterUserHandle?: string;
}
interface Params {
  type: TaskType;
  userId: string;
  data?: TaskData;
}

export function completeTask({type, userId, data}: Params) {
  return put<Params, null>(`/tasks/${type}/users/${userId}`, {
    type,
    userId,
    data,
  });
}
