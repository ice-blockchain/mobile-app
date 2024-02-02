// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {QuizActions} from '@store/modules/Quiz/actions';
import {checkQuizStatusSaga} from '@store/modules/Quiz/sagas/checkQuizStatus';
import {startOrContinueQuizSaga} from '@store/modules/Quiz/sagas/startOrContinueQuiz';
import {takeLatest} from 'redux-saga/effects';

export const quizWatchers = [
  takeLatest(
    QuizActions.START_OR_CONTINUE_QUIZ.START.type,
    startOrContinueQuizSaga,
  ),
  takeLatest(
    [
      QuizActions.CHECK_QUIZ_STATUS.START.type,
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      QuizActions.START_OR_CONTINUE_QUIZ.SUCCESS.type,
    ],
    checkQuizStatusSaga,
  ),
];
