// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* loadTasksSaga() {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  try {
    const tasks: SagaReturnType<typeof Api.tasks.getTasks> = yield call(
      Api.tasks.getTasks,
      userId,
    );
    yield put(AchievementsActions.TASKS_LOAD.SUCCESS.create({tasks}));
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(AchievementsActions.TASKS_LOAD.FAILED.create(errorMessage));

    throw error;
  }
}
