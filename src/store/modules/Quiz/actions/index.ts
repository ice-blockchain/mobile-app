// SPDX-License-Identifier: ice License 1.0

import {Quiz, QuizStatus} from '@api/kyc/types';
import {createAction} from '@store/utils/actions/createAction';

const START_OR_CONTINUE_QUIZ = createAction('START_OR_CONTINUE_QUIZ', {
  START: (payload?: {selectedOption: number}) => payload,
  SUCCESS: (payload: {quiz: Quiz}) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
  RESET: true,
});

const CHECK_QUIZ_STATUS = createAction('CHECK_QUIZ_STATUS', {
  SUCCESS: (payload: {status: QuizStatus}) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const RESET_QUIZ = createAction('RESET_QUIZ', {
  RESET: true,
});

export const QuizActions = Object.freeze({
  START_OR_CONTINUE_QUIZ,
  CHECK_QUIZ_STATUS,
  RESET_QUIZ,
});
