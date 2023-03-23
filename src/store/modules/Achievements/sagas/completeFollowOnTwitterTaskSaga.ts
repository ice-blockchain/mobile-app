// SPDX-License-Identifier: ice License 1.0

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {put, select} from 'redux-saga/effects';

export function* completeFollowOnTwitterTaskSaga() {
  const task: ReturnType<
    ReturnType<typeof AchievementsSelectors.getTaskByType>
  > = yield select(
    AchievementsSelectors.getTaskByType({type: 'follow_us_on_twitter'}),
  );

  if (task && !task.completed) {
    yield put(
      AchievementsActions.TASK_MARK_COMPLETED.START.create({
        type: 'follow_us_on_twitter',
        data: {
          /** TODO: tasks: replace with real twitter username when twitter
           auth api will be connected */
          twitterUserHandle: 'x',
        },
      }),
    );
  }
}
