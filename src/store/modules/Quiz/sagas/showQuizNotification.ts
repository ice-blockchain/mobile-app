// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {dayjs} from '@services/dayjs';
import {QuizActions} from '@store/modules/Quiz/actions';
import {
  quizNotificationShownIndexSelector,
  quizStatusSelector,
} from '@store/modules/Quiz/selectors';
import {openQuizNotification} from '@store/modules/Quiz/utils/openQuizNotification';
import {daysFromNow} from '@utils/date';
import {findLastIndex} from 'lodash';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

/**
 * QUIZ_NOTIFICATION_TIMEOUT_MINUTES contains a sequence of timeouts.
 * If timeout is a positive number
 *  then we count this number of minutes from the beginning of quiz availability (kycQuizAvailabilityStartedAt)
 * If negative
 *  then till the end of availability (kycQuizAvailabilityStartedAt)
 * If a timeout occurs, all the previous ones are skipped (looking from the end).
 */
export function* showQuizNotificationSaga() {
  const quizStatus: SagaReturnType<typeof quizStatusSelector> = yield select(
    quizStatusSelector,
  );

  const timeouts = ENV.QUIZ_NOTIFICATION_TIMEOUT_MINUTES;
  const quizNotificationShownIndex: SagaReturnType<
    typeof quizNotificationShownIndexSelector
  > = yield select(quizNotificationShownIndexSelector);
  if (
    timeouts &&
    quizNotificationShownIndex < timeouts.length - 1 &&
    quizStatus &&
    quizStatus.kycQuizAvailable &&
    !quizStatus.kycQuizCompleted &&
    !quizStatus.kycQuizDisabled
  ) {
    const minutesPassedFromStart = dayjs().diff(
      dayjs(quizStatus.kycQuizAvailabilityStartedAt),
      'minute',
      true,
    );
    const minutesLeftTillEnd = dayjs(
      quizStatus.kycQuizAvailabilityEndedAt,
    ).diff(dayjs(), 'minute', true);

    const timeoutToShowIndex = findLastIndex(timeouts, timeout => {
      if (timeout > 0) {
        return minutesPassedFromStart > timeout;
      } else {
        return minutesLeftTillEnd < -timeout;
      }
    });

    if (
      timeoutToShowIndex !== -1 &&
      quizNotificationShownIndex < timeoutToShowIndex
    ) {
      yield put(
        QuizActions.SET_QUIZ_NOTIFICATION_SHOWN.STATE.create({
          index: timeoutToShowIndex,
        }),
      );
      yield call(openQuizNotification, {
        retries: quizStatus.kycQuizRemainingAttempts ?? 0,
        daysLeft: daysFromNow(quizStatus.kycQuizAvailabilityEndedAt),
      });
    }
  }
}
