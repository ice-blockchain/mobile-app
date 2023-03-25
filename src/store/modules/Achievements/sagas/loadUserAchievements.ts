// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
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

    yield put(
      AchievementsActions.USER_ACHIEVEMENTS_LOAD.SUCCESS.create({
        userId,
        achievements: {
          levelsAndRoles: {level, roles: roles},
        },
      }),
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
          badges: getBadgesResult || [],
        },
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (isApiError(error, 403, 'BADGES_HIDDEN')) {
      yield put(
        AchievementsActions.USER_ACHIEVEMENTS_LOAD.SUCCESS.create({
          userId,
          achievements: {
            badges: [],
          },
        }),
      );
    } else {
      yield put(
        AchievementsActions.USER_ACHIEVEMENTS_LOAD.FAILED.create(errorMessage),
      );
    }

    throw error;
  }
}
