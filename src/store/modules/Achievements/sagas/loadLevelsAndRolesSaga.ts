// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* loadLevelsAndRolesSaga() {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

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

    const activeRole = roles.find(({enabled}) => enabled);

    yield put(
      AchievementsActions.LEVELS_AND_ROLES_LOAD.SUCCESS.create({
        level,
        roleType: activeRole?.type || 'snowman',
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(
      AchievementsActions.LEVELS_AND_ROLES_LOAD.FAILED.create(errorMessage),
    );

    throw error;
  }
}
