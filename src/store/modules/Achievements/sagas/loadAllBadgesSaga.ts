// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = AchievementsActions.ALL_BADGES_LOAD.START.create;

export function* loadAllBadges(action: ReturnType<typeof actionCreator>) {
  const {userId} = action.payload;

  try {
    const getBadgesByTypeResultCoin: SagaReturnType<
      typeof Api.achievements.getBadgesByType
    > = yield call(Api.achievements.getBadgesByType, {
      type: 'coin',
      userId,
    });

    const getBadgesByTypeResultLevel: SagaReturnType<
      typeof Api.achievements.getBadgesByType
    > = yield call(Api.achievements.getBadgesByType, {
      type: 'level',
      userId,
    });

    const getBadgesByTypeResultSocial: SagaReturnType<
      typeof Api.achievements.getBadgesByType
    > = yield call(Api.achievements.getBadgesByType, {
      type: 'social',
      userId,
    });

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
