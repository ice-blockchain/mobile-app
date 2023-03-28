// SPDX-License-Identifier: ice License 1.0

import {Achievements} from '@api/achievements/types';
import {Task, TaskData, TaskType} from '@api/tasks/types';
import {createAction} from '@store/utils/actions/createAction';

const LEVELS_AND_ROLES_LOAD = createAction(
  'ACHIEVEMENTS/LEVELS_AND_ROLES_LOAD',
  {
    START: (payload?: {userId: string}) => payload,
    SUCCESS: (payload: {userId: string; achievements: Achievements}) => payload,
    FAILED: (errorMessage: string) => ({errorMessage}),
  },
);

const USER_ACHIEVEMENTS_LOAD = createAction(
  'ACHIEVEMENTS/USER_ACHIEVEMENTS_LOAD',
  {
    START: (userId: string) => ({userId}),
    SUCCESS: (payload: {userId: string; achievements: Achievements}) => payload,
    FAILED: (errorMessage: string) => ({errorMessage}),
  },
);

const ALL_BADGES_LOAD = createAction('ACHIEVEMENTS/ALL_BADGES_LOAD', {
  START: (userId: string) => ({userId}),
  SUCCESS: (payload: {userId: string; achievements: Achievements}) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const TASKS_LOAD = createAction('ACHIEVEMENTS/TASKS_LOAD', {
  START: true,
  SUCCESS: (payload: {tasks: Task[]}) => payload,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const TASK_MARK_COMPLETED = createAction('ACHIEVEMENTS/TASK_MARK_COMPLETED', {
  START: (payload: {type: TaskType; data?: TaskData}) => payload,

  TELEGRAM: (payload: {telegramUserHandle: string}) => payload,
  TWITTER: true,
});

export const AchievementsActions = Object.freeze({
  LEVELS_AND_ROLES_LOAD,
  TASKS_LOAD,
  TASK_MARK_COMPLETED,
  USER_ACHIEVEMENTS_LOAD,
  ALL_BADGES_LOAD,
});
