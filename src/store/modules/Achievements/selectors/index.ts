// SPDX-License-Identifier: ice License 1.0

import {getAchievements} from './getAchievements';
import {getAchievementsByUserId} from './getAchievementsByUserId';
import {getBadgesForType} from './getBadgesForType';
import {getBadgesSummary} from './getBadgesSummary';
import {getLevelByUserId} from './getLevelByUserId';
import {getRolesByUserId} from './getRolesByUserId';
import {getRoleTypeByUserId} from './getRoleTypeByUserId';
import {getTaskByType} from './getTaskByType';
import {getTasks} from './getTasks';
import {hasUncompletedTasks} from './hasUncompletedTasks';

export const AchievementsSelectors = Object.freeze({
  getRoleTypeByUserId,
  getTaskByType,
  getTasks,
  hasUncompletedTasks,
  getAchievements,
  getAchievementsByUserId,
  getBadgesSummary,
  getBadgesForType,
  getRolesByUserId,
  getLevelByUserId,
});
