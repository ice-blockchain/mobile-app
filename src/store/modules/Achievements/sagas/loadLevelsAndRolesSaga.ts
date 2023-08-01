// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {Attributes} from '@services/analytics';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* loadLevelsAndRolesSaga(
  action: ReturnType<
    | typeof AchievementsActions.LEVELS_AND_ROLES_LOAD.START.create
    | typeof AppCommonActions.INTERVAL_UPDATE.STATE.create
  >,
) {
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );

  const isAppActive: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAppActiveSelector,
  );

  const authenticatedUsedId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  const userId = action.payload?.userId ?? authenticatedUsedId;

  if (isAuthorized && isAppActive) {
    try {
      const {
        data: {level, roles},
      }: SagaReturnType<typeof Api.achievements.getLevelsAndRoles> = yield call(
        Api.achievements.getLevelsAndRoles,
        {
          userId,
        },
      );
      yield put(
        AchievementsActions.LEVELS_AND_ROLES_LOAD.SUCCESS.create({
          userId,
          achievements: {
            levelsAndRoles: {level, roles: roles || []},
          },
        }),
      );
      const role = roles?.find(r => r.enabled);
      yield call(Attributes.trackUserAttribute, 'Current Level', level);
      yield call(
        Attributes.trackUserAttribute,
        'Current Role',
        role?.type || 'snowman',
      );
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      yield put(
        AchievementsActions.LEVELS_AND_ROLES_LOAD.FAILED.create(errorMessage),
      );

      throw error;
    }
  }
}
