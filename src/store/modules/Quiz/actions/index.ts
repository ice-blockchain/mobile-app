// SPDX-License-Identifier: ice License 1.0

import {Quiz} from '@api/kyc/types';
import {EmotionsAuthStatus} from '@store/modules/FaceRecognition/types';
import {createAction} from '@store/utils/actions/createAction';

const START_OR_CONTINUE_QUIZ = createAction('START_OR_CONTINUE_QUIZ', {
  START: (payload: {selectedOption?: number}) => payload,
  SUCCESS: (payload: {quiz: Quiz}) => payload,
  FAILURE: (payload: {status: EmotionsAuthStatus}) => payload,
  RESET: true,
});

const START_OR_CONTINUE_QUIZ_FLOW = createAction(
  'START_OR_CONTINUE_QUIZ_FLOW',
  {
    STATE: true,
  },
);

const ACCEPT_QUIZ_TERMS = createAction('ACCEPT_QUIZ_TERMS', {
  START: true,
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const RESET_QUIZ = createAction('RESET_QUIZ', {
  RESET: true,
});

export const QuizActions = Object.freeze({
  START_OR_CONTINUE_QUIZ,
  START_OR_CONTINUE_QUIZ_FLOW,
  ACCEPT_QUIZ_TERMS,
  RESET_QUIZ,
});
