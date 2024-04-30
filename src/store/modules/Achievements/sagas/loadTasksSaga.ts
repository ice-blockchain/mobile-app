// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {Attributes} from '@services/analytics';
import {userIdSelector} from '@store/modules/Account/selectors';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* loadTasksSaga() {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  try {
    const {data: tasks}: SagaReturnType<typeof Api.tasks.getTasks> = yield call(
      Api.tasks.getTasks,
      userId,
    );
    yield put(AchievementsActions.TASKS_LOAD.SUCCESS.create({tasks}));
    const currentTask = tasks.find(task => !task.completed);
    const currentTaskValue = currentTask
      ? t(`home.tasks.${currentTask.type}.title`, {
          locale: 'en',
        })
      : 'Completed';
    yield call(Attributes.trackUserAttribute, 'Current Task', currentTaskValue);
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(AchievementsActions.TASKS_LOAD.FAILED.create(errorMessage));

    throw error;
  }
}
