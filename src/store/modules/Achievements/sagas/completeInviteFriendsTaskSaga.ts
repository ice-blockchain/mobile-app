// SPDX-License-Identifier: ice License 1.0

import {userSelector} from '@store/modules/Account/selectors';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {put, select} from 'redux-saga/effects';

export function* completeInviteFriendsTaskSaga() {
  const task: ReturnType<
    ReturnType<typeof AchievementsSelectors.getTaskByType>
  > = yield select(
    AchievementsSelectors.getTaskByType({type: 'invite_friends'}),
  );

  const user: ReturnType<typeof userSelector> = yield select(userSelector);
  const t1RefCount = user?.t1HumanReferralCount ?? user?.t1ReferralCount;

  const requiredInvitesCount = task?.data?.requiredQuantity;
  if (
    task &&
    !task.completed &&
    requiredInvitesCount &&
    t1RefCount &&
    t1RefCount >= requiredInvitesCount
  ) {
    yield put(
      AchievementsActions.TASK_MARK_COMPLETED.START.create({
        type: 'invite_friends',
      }),
    );
  }
}
