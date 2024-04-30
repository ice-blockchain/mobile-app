// SPDX-License-Identifier: ice License 1.0

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {put, select} from 'redux-saga/effects';

export function* completeStartMiningTaskSaga() {
  const task: ReturnType<
    ReturnType<typeof AchievementsSelectors.getTaskByType>
  > = yield select(AchievementsSelectors.getTaskByType({type: 'start_mining'}));

  if (task && !task.completed) {
    yield put(
      AchievementsActions.TASK_MARK_COMPLETED.START.create({
        type: 'start_mining',
      }),
    );
  }
}
