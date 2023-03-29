// SPDX-License-Identifier: ice License 1.0

import {createSelector} from '@reduxjs/toolkit';
import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {RootState} from '@store/rootReducer';

interface Options {
  userId?: string | undefined;
}
const selector = createSelector(
  [getAchievements, (_state: RootState, {userId}: Options) => userId],
  (achievements, userId) => {
    let roles;
    if (userId && achievements && achievements[userId]) {
      roles = achievements[userId].levelsAndRoles?.roles;
    }
    return roles || [];
  },
);

export const getRolesByUserId = (options: Options) => (state: RootState) =>
  selector(state, options);
