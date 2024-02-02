// SPDX-License-Identifier: ice License 1.0

import {Quiz, QuizStatus} from '@api/kyc/types';
import {AccountActions} from '@store/modules/Account/actions';
import {QuizActions} from '@store/modules/Quiz/actions';
import produce from 'immer';

export interface State {
  quiz: Quiz | null;
  status: QuizStatus | null;
}

type Actions = ReturnType<
  | typeof QuizActions.START_OR_CONTINUE_QUIZ.SUCCESS.create
  | typeof QuizActions.RESET_QUIZ.RESET.create
  | typeof QuizActions.CHECK_QUIZ_STATUS.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  quiz: null,
  status: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case QuizActions.START_OR_CONTINUE_QUIZ.SUCCESS.type:
        draft.quiz = action.payload.quiz;
        break;
      case QuizActions.CHECK_QUIZ_STATUS.SUCCESS.type:
        draft.status = action.payload.status;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type:
      case QuizActions.RESET_QUIZ.RESET.type:
        return {...INITIAL_STATE};
    }
  });
}

export const quizReducer = reducer;
