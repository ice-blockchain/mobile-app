// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getErrorMessage} from '@utils/errors';
import {all, call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = AchievementsActions.ALL_BADGES_LOAD.START.create;

type BadgesReturnType = SagaReturnType<typeof Api.achievements.getBadgesByType>;

export function* loadAllBadges(action: ReturnType<typeof actionCreator>) {
  const {userId} = action.payload;

  try {
    const [
      getBadgesByTypeResultSocial,
      getBadgesByTypeResultLevel,
      getBadgesByTypeResultCoin,
    ]: [BadgesReturnType, BadgesReturnType, BadgesReturnType] = yield all([
      call(Api.achievements.getBadgesByType, {
        type: 'coin',
        userId,
      }),
      call(Api.achievements.getBadgesByType, {
        type: 'level',
        userId,
      }),
      call(Api.achievements.getBadgesByType, {
        type: 'social',
        userId,
      }),
    ]);

    yield put(
      AchievementsActions.ALL_BADGES_LOAD.SUCCESS.create({
        userId,
        achievements: {
          coinBadges: getBadgesByTypeResultSocial.data || [],
          levelBadges: getBadgesByTypeResultLevel.data || [],
          socialBadges: getBadgesByTypeResultCoin.data || [],
        },
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    yield put(AchievementsActions.ALL_BADGES_LOAD.FAILED.create(errorMessage));

    throw error;
  }
}
