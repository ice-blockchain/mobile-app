// SPDX-License-Identifier: ice License 1.0

import {Quiz, QuizStatus} from '@api/kyc/types';
import {createAction} from '@store/utils/actions/createAction';

const START_OR_CONTINUE_QUIZ = createAction('START_OR_CONTINUE_QUIZ', {
  START: (payload?: {selectedOption: number}) => payload,
  SUCCESS: (payload: {quiz: Quiz}) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
  COMPLETE: true,
});

const CHECK_QUIZ_STATUS = createAction('CHECK_QUIZ_STATUS', {
  START: true,
  SUCCESS: (payload: {status: QuizStatus}) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const QuizActions = Object.freeze({
  START_OR_CONTINUE_QUIZ,
  CHECK_QUIZ_STATUS,
});
