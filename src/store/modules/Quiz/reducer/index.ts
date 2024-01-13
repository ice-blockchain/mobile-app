// SPDX-License-Identifier: ice License 1.0

import {Quiz} from '@api/kyc/types';
import {AccountActions} from '@store/modules/Account/actions';
import {QuizActions} from '@store/modules/Quiz/actions';
import produce from 'immer';

export interface State {
  quiz: Quiz | null;
}

type Actions = ReturnType<
  | typeof QuizActions.START_OR_CONTINUE_QUIZ.SUCCESS.create
  | typeof QuizActions.RESET_QUIZ.RESET.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  quiz: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case QuizActions.START_OR_CONTINUE_QUIZ.SUCCESS.type:
        draft.quiz = action.payload.quiz;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type:
      case QuizActions.RESET_QUIZ.RESET.type:
        return {...INITIAL_STATE};
    }
  });
}

export const quizReducer = reducer;
