// SPDX-License-Identifier: ice License 1.0

import {Quiz, QuizStatus} from '@api/kyc/types';
import {User} from '@api/user/types';
import {createAction} from '@store/utils/actions/createAction';

const START_OR_CONTINUE_QUIZ = createAction('START_OR_CONTINUE_QUIZ', {
  START: (payload?: {selectedOption: number}) => payload,
  SUCCESS: (payload: {quiz: Quiz}) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
  COMPLETED: true,
});

const CHECK_QUIZ_STATUS = createAction('CHECK_QUIZ_STATUS', {
  START: true,
  SUCCESS: (payload: {status: QuizStatus}) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const SET_QUIZ_NOTIFICATION_SHOWN = createAction(
  'SET_QUIZ_NOTIFICATION_SHOWN',
  {
    STATE: (payload: {index: number}) => payload,
  },
);

const RESET_QUIZ_KYC_STEP = createAction('RESET_QUIZ_KYC_STEP', {
  START: true,
  SUCCESS: (params: {user: User}) => params,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const QuizActions = Object.freeze({
  START_OR_CONTINUE_QUIZ,
  CHECK_QUIZ_STATUS,
  SET_QUIZ_NOTIFICATION_SHOWN,
  RESET_QUIZ_KYC_STEP,
});
