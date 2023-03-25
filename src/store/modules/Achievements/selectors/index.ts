// SPDX-License-Identifier: ice License 1.0

import {getAchievements} from './getAchievements';
import {getAchievementsByUserId} from './getAchievementsByUserId';
import {getBadgesForType} from './getBadgesForType';
import {getBadgesSummary} from './getBadgesSummary';
import {getLevel} from './getLevel';
import {getRolesByUserId} from './getRolesByUserId';
import {getRoleType} from './getRoleType';
import {getRoleTypeByUserId} from './getRoleTypeByUserId';
import {getTaskByType} from './getTaskByType';
import {getTasks} from './getTasks';
import {hasUncompletedTasks} from './hasUncompletedTasks';

export const AchievementsSelectors = Object.freeze({
  getLevel,
  getRoleType,
  getRoleTypeByUserId,
  getTaskByType,
  getTasks,
  hasUncompletedTasks,
  getAchievements,
  getAchievementsByUserId,
  getBadgesSummary,
  getBadgesForType,
  getRolesByUserId,
});
