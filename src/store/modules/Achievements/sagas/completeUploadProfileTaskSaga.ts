// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {
  actionPayloadSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {checkProp} from '@utils/guards';
import {put, select} from 'redux-saga/effects';

export function* completeUploadProfileTaskSaga() {
  const task: ReturnType<
    ReturnType<typeof AchievementsSelectors.getTaskByType>
  > = yield select(
    AchievementsSelectors.getTaskByType({type: 'upload_profile_picture'}),
  );

  const isSuccessUpdate: ReturnType<typeof isSuccessSelector> = yield select(
    isSuccessSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const updatePayload: ReturnType<typeof actionPayloadSelector> = yield select(
    actionPayloadSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  if (isSuccessUpdate && checkProp(updatePayload, 'userInfo')) {
    const userInfo = updatePayload.userInfo as Partial<User>;
    if (userInfo.profilePicture && task && !task.completed) {
      yield put(
        AchievementsActions.TASK_MARK_COMPLETED.START.create({
          type: 'upload_profile_picture',
        }),
      );
    }
  }
}
