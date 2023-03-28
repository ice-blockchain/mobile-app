// SPDX-License-Identifier: ice License 1.0

import {getBadgesByType} from './getBadgesByType';
import {getBadgeSummaries} from './getBadgeSummaries';
import {getLevelsAndRoles} from './getLevelsAndRoles';

export const achievements = Object.freeze({
  getLevelsAndRoles,
  getBadgeSummaries,
  getBadgesByType,
});
