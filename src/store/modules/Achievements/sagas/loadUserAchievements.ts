// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = AchievementsActions.USER_ACHIEVEMENTS_LOAD.START.create;

export function* loadUserAchievements(
  action: ReturnType<typeof actionCreator>,
) {
  const {userId} = action.payload;

  try {
    const {
      level,
      roles,
    }: SagaReturnType<typeof Api.achievements.getLevelsAndRoles> = yield call(
      Api.achievements.getLevelsAndRoles,
      {
        userId,
      },
    );

    const getBadgesResult: SagaReturnType<
      typeof Api.achievements.getBadgeSummaries
    > = yield call(Api.achievements.getBadgeSummaries, {
      userId,
    });

    yield put(
      AchievementsActions.USER_ACHIEVEMENTS_LOAD.SUCCESS.create({
        userId,
        achievements: {
          levelsAndRoles: {level, roles: roles},
          badges: getBadgesResult || [],
        },
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    yield put(
      AchievementsActions.USER_ACHIEVEMENTS_LOAD.FAILED.create(errorMessage),
    );

    throw error;
  }
}
