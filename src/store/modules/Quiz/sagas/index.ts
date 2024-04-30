// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {QuizActions} from '@store/modules/Quiz/actions';
import {checkQuizStatusSaga} from '@store/modules/Quiz/sagas/checkQuizStatus';
import {resetQuizKycStepSaga} from '@store/modules/Quiz/sagas/resetQuizKycStep';
import {showQuizNotificationSaga} from '@store/modules/Quiz/sagas/showQuizNotification';
import {startOrContinueQuizSaga} from '@store/modules/Quiz/sagas/startOrContinueQuiz';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {takeLatest} from 'redux-saga/effects';

export const quizWatchers = [
  takeLatest(
    QuizActions.START_OR_CONTINUE_QUIZ.START.type,
    startOrContinueQuizSaga,
  ),
  takeLatest(
    [
      QuizActions.CHECK_QUIZ_STATUS.START.type,
      QuizActions.START_OR_CONTINUE_QUIZ.COMPLETED.type,
      QuizActions.RESET_QUIZ_KYC_STEP.SUCCESS.type,
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      TokenomicsActions.START_MINING_SESSION.SUCCESS.type,
      TokenomicsActions.START_MINING_SESSION.FAILED.type,
    ],
    checkQuizStatusSaga,
  ),
  takeLatest(
    TokenomicsActions.START_MINING_SESSION.SUCCESS.type,
    showQuizNotificationSaga,
  ),
  takeLatest(
    [
      AppCommonActions.APP_INITIALIZED.SUCCESS.type,
      QuizActions.RESET_QUIZ_KYC_STEP.START.type,
    ],
    resetQuizKycStepSaga,
  ),
];
