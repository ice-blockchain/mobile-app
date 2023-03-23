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

  const requiredInvitesCount = task?.data?.requiredQuantity;
  if (
    task &&
    !task.completed &&
    requiredInvitesCount &&
    user?.t1ReferralCount &&
    user?.t1ReferralCount >= requiredInvitesCount
  ) {
    yield put(
      AchievementsActions.TASK_MARK_COMPLETED.START.create({
        type: 'invite_friends',
      }),
    );
  }
}
