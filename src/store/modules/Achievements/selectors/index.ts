// SPDX-License-Identifier: ice License 1.0

import {getLevel} from './getLevel';
import {getRoleType} from './getRoleType';
import {getTaskByType} from './getTaskByType';
import {getTasks} from './getTasks';
import {hasUncompletedTasks} from './hasUncompletedTasks';

export const AchievementsSelectors = Object.freeze({
  getLevel,
  getRoleType,
  getTaskByType,
  getTasks,
  hasUncompletedTasks,
});
