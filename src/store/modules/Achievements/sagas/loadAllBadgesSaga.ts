// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getErrorMessage} from '@utils/errors';
import {all, call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = AchievementsActions.ALL_BADGES_LOAD.START.create;

export function* loadAllBadges(action: ReturnType<typeof actionCreator>) {
  const {userId} = action.payload;

  try {
    let getBadgesByTypeResultCoin: SagaReturnType<
      typeof Api.achievements.getBadgesByType
    >;
    let getBadgesByTypeResultLevel: SagaReturnType<
      typeof Api.achievements.getBadgesByType
    >;
    let getBadgesByTypeResultSocial: SagaReturnType<
      typeof Api.achievements.getBadgesByType
    >;

    [
      getBadgesByTypeResultCoin,
      getBadgesByTypeResultLevel,
      getBadgesByTypeResultSocial,
    ] = yield all([
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
          socialBadges: getBadgesByTypeResultSocial || [],
          levelBadges: getBadgesByTypeResultLevel || [],
          coinBadges: getBadgesByTypeResultCoin || [],
        },
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    yield put(AchievementsActions.ALL_BADGES_LOAD.FAILED.create(errorMessage));

    throw error;
  }
}
