// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, select} from 'redux-saga/effects';

const actionCreator = AchievementsActions.TASK_MARK_COMPLETED.START.create;

export function* taskMarkCompletedSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  try {
    const {type, data} = action.payload;

    yield call(Api.tasks.completeTask, {type, userId, data});

    yield put(AchievementsActions.TASKS_LOAD.START.create());
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(AchievementsActions.TASKS_LOAD.FAILED.create(errorMessage));

    throw error;
  }
}
