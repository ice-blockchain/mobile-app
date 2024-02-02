// SPDX-License-Identifier: ice License 1.0

import {QuizActions} from '@store/modules/Quiz/actions';
import {startOrContinueQuizSaga} from '@store/modules/Quiz/sagas/startOrContinueQuiz';
import {takeLatest} from 'redux-saga/effects';

export const quizWatchers = [
  takeLatest(
    QuizActions.START_OR_CONTINUE_QUIZ.START.type,
    startOrContinueQuizSaga,
  ),
];
