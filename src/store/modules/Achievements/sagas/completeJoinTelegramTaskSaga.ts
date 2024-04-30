// SPDX-License-Identifier: ice License 1.0

import {Attributes} from '@services/analytics';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {call, put, select} from 'redux-saga/effects';

const actionCreator = AchievementsActions.TASK_MARK_COMPLETED.TELEGRAM.create;

export function* completeJoinTelegramTaskSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const task: ReturnType<
    ReturnType<typeof AchievementsSelectors.getTaskByType>
  > = yield select(
    AchievementsSelectors.getTaskByType({type: 'join_telegram'}),
  );

  const {telegramUserHandle} = action.payload;

  if (task && !task.completed) {
    yield put(
      AchievementsActions.TASK_MARK_COMPLETED.START.create({
        type: 'join_telegram',
        data: {
          telegramUserHandle,
        },
      }),
    );
    yield call(AnalyticsEventLogger.trackShareTelegramUsername, {
      tgUsername: telegramUserHandle,
    });
    yield call(
      Attributes.trackUserAttribute,
      'Telegram Username',
      telegramUserHandle,
    );
  }
}
