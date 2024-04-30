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
    if (userId) {
      return achievements[userId]?.badges ?? [];
    }
    return [];
  },
);

export const getBadgesSummary = (options: Options) => (state: RootState) =>
  selector(state, options);
