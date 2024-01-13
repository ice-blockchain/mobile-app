// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {START_QUIZ_CODE} from '@constants/quiz';
import {navigate} from '@navigation/utils';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {QuizActions} from '@store/modules/Quiz/actions';
import {quizSelector} from '@store/modules/Quiz/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {showError} from '@utils/errors';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

type Actions = ReturnType<
  typeof QuizActions.START_OR_CONTINUE_QUIZ.START.create
>;

export function* startOrContinueQuizSaga(action: Actions) {
  const {selectedOption} = action.payload;
  const user: SagaReturnType<typeof unsafeUserSelector> = yield select(
    unsafeUserSelector,
  );

  const currentQuiz: SagaReturnType<typeof quizSelector> = yield select(
    quizSelector,
  );

  try {
    const response: SagaReturnType<typeof Api.kyc.startOrContinueQuiz> =
      yield call(Api.kyc.startOrContinueQuiz, {
        userId: user.id,
        language: user.language,
        selectedOption: selectedOption ?? START_QUIZ_CODE,
        questionNumber:
          currentQuiz && currentQuiz.progress
            ? currentQuiz.progress.nextQuestion.number
            : START_QUIZ_CODE,
      });

    yield put(
      QuizActions.START_OR_CONTINUE_QUIZ.SUCCESS.create({
        quiz: response,
      }),
    );
  } catch (error: unknown) {
    if (isApiError(error, 403, 'USER_DISABLED')) {
      yield put(
        QuizActions.START_OR_CONTINUE_QUIZ.FAILURE.create({
          status: 'BANNED',
        }),
      );
    } else if (
      isApiError(error, 429, 'RATE_LIMIT_EXCEEDED') ||
      isApiError(error, 429, 'RATE_LIMIT_NEGATIVE_EXCEEDED')
    ) {
      yield put(
        QuizActions.START_OR_CONTINUE_QUIZ.FAILURE.create({
          status: 'TRY_LATER',
        }),
      );
    } else if (isApiError(error, 409, 'QUESTION_ALREADY_ANSWERED')) {
      yield put(
        QuizActions.START_OR_CONTINUE_QUIZ.START.create({
          selectedOption: START_QUIZ_CODE,
        }),
      );
    } else if (isApiError(error, 400, 'RACE_CONDITION')) {
      yield navigate({
        name: 'HomeTab',
        params: {screen: 'Home'},
      });
      yield put(QuizActions.START_OR_CONTINUE_QUIZ.RESET.create());
      yield put(TokenomicsActions.START_MINING_SESSION.START.create());
    } else {
      yield put(
        QuizActions.START_OR_CONTINUE_QUIZ.FAILURE.create({
          status: 'FAILED',
        }),
      );
      yield spawn(showError, error);
      throw error;
    }
  }
}
