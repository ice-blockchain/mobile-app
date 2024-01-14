// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {START_QUIZ_CODE} from '@constants/quiz';
import {navigate} from '@navigation/utils';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {QuizActions} from '@store/modules/Quiz/actions';
import {quizSelector} from '@store/modules/Quiz/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {getErrorMessage, showError} from '@utils/errors';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

type Actions = ReturnType<
  typeof QuizActions.START_OR_CONTINUE_QUIZ.START.create
>;

export function* startOrContinueQuizSaga({payload}: Actions) {
  const user: SagaReturnType<typeof unsafeUserSelector> = yield select(
    unsafeUserSelector,
  );

  const currentQuiz: SagaReturnType<typeof quizSelector> = yield select(
    quizSelector,
  );

  try {
    const nextQuestionNumber = currentQuiz?.progress?.nextQuestion.number;

    if (payload && nextQuestionNumber == null) {
      throw new Error('Answer question error - current quiz progress is null');
    }

    const selectedOption = payload ? payload.selectedOption : START_QUIZ_CODE;
    const questionNumber =
      payload && nextQuestionNumber ? nextQuestionNumber : START_QUIZ_CODE;

    const quiz: SagaReturnType<typeof Api.kyc.startOrContinueQuiz> = yield call(
      Api.kyc.startOrContinueQuiz,
      {
        userId: user.id,
        language: user.language,
        selectedOption,
        questionNumber,
      },
    );

    yield put(QuizActions.START_OR_CONTINUE_QUIZ.SUCCESS.create({quiz}));
  } catch (error: unknown) {
    if (isApiError(error, 400, 'RACE_CONDITION')) {
      yield navigate({
        name: 'HomeTab',
        params: {screen: 'Home'},
      });
      yield put(QuizActions.START_OR_CONTINUE_QUIZ.RESET.create());
      yield put(TokenomicsActions.START_MINING_SESSION.START.create());
    } else {
      yield put(
        QuizActions.START_OR_CONTINUE_QUIZ.FAILED.create(
          getErrorMessage(error),
        ),
      );
      yield spawn(showError, error);
      throw error;
    }
  }
}
