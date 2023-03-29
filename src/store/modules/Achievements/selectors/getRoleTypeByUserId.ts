// SPDX-License-Identifier: ice License 1.0

import {createSelector} from '@reduxjs/toolkit';
import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {RootState} from '@store/rootReducer';

interface Options {
  userId?: string;
}
const selector = createSelector(
  [getAchievements, (_state: RootState, {userId}: Options) => userId],
  (achievements, userId) => {
    let roleType;
    if (userId && achievements && achievements[userId]) {
      const activeRole = achievements[userId].levelsAndRoles?.roles?.find(
        ({enabled}) => enabled,
      );
      roleType = activeRole?.type;
    }
    return roleType || 'snowman';
  },
);

export const getRoleTypeByUserId = (options: Options) => (state: RootState) =>
  selector(state, options);
