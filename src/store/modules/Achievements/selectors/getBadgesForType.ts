// SPDX-License-Identifier: ice License 1.0

import {Badge, BadgeType} from '@api/achievements/types';
import {createSelector} from '@reduxjs/toolkit';
import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {RootState} from '@store/rootReducer';

interface Options {
  userId?: string;
  type: BadgeType;
}
const selector = createSelector(
  [
    getAchievements,
    (_state: RootState, {userId, type}: Options) => ({userId, type}),
  ],
  (achievements, {userId, type}) => {
    let badges: Badge[] | undefined;
    if (userId && achievements && achievements[userId]) {
      const {coinBadges, levelBadges, socialBadges} = achievements[userId];
      switch (type) {
        case 'coin':
          badges = coinBadges;
          break;
        case 'level':
          badges = levelBadges;
          break;
        case 'social':
          badges = socialBadges;
          break;
      }
    }
    return badges || [];
  },
);

export const getBadgesForType = (options: Options) => (state: RootState) =>
  selector(state, options);
