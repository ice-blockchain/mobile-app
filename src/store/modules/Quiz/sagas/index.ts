// SPDX-License-Identifier: ice License 1.0

import {QuizActions} from '@store/modules/Quiz/actions';
import {acceptQuizTermsSaga} from '@store/modules/Quiz/sagas/acceptQuizTerms';
import {startOrContinueQuizSaga} from '@store/modules/Quiz/sagas/startOrContinueQuiz';
import {startQuizFlowSaga} from '@store/modules/Quiz/sagas/startQuizFlow';
import {takeLatest} from 'redux-saga/effects';

export const quizWatchers = [
  takeLatest(
    QuizActions.START_OR_CONTINUE_QUIZ.START.type,
    startOrContinueQuizSaga,
  ),
  takeLatest(
    QuizActions.START_OR_CONTINUE_QUIZ_FLOW.STATE.type,
    startQuizFlowSaga,
  ),
  takeLatest(QuizActions.ACCEPT_QUIZ_TERMS.STATE.type, acceptQuizTermsSaga),
];
