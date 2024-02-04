// SPDX-License-Identifier: ice License 1.0

import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {QuizActions} from '@store/modules/Quiz/actions';
import {quizStatusSelector} from '@store/modules/Quiz/selectors';
import {openQuizNotification} from '@store/modules/Quiz/utils/openQuizNotification';
import {waitForSelector} from '@store/utils/sagas/effects';
import {daysFromNow} from '@utils/date';
import {call, SagaReturnType, select} from 'redux-saga/effects';

export function* showQuizNotificationSaga() {
  const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
    isAppActiveSelector,
  );

  if (!isAppActive) {
    return;
  }

  yield call(waitForSelector, state => quizStatusSelector(state) !== null, {
    takePattern: QuizActions.CHECK_QUIZ_STATUS.SUCCESS.type,
  });

  const quizStatus: SagaReturnType<typeof quizStatusSelector> = yield select(
    quizStatusSelector,
  );

  if (quizStatus) {
    yield call(openQuizNotification, {
      retries: quizStatus.kycQuizRemainingAttempts,
      daysLeft: daysFromNow(quizStatus.kycQuizAvailabilityEndedAt),
    });
  }
}
