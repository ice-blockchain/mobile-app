// SPDX-License-Identifier: ice License 1.0

import {Quiz, QuizStatus} from '@api/kyc/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Account/actions';
import {QuizActions} from '@store/modules/Quiz/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  quiz: Quiz | null;
  status: QuizStatus | null;
  quizNotificationShownIndex: number;
  hasUnfinishedQuiz: boolean;
}

type Actions = ReturnType<
  | typeof QuizActions.START_OR_CONTINUE_QUIZ.SUCCESS.create
  | typeof QuizActions.START_OR_CONTINUE_QUIZ.COMPLETED.create
  | typeof QuizActions.CHECK_QUIZ_STATUS.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
  | typeof QuizActions.SET_QUIZ_NOTIFICATION_SHOWN.STATE.create
  | typeof QuizActions.RESET_QUIZ_KYC_STEP.START.create
>;

const INITIAL_STATE: State = {
  quiz: null,
  status: null,
  quizNotificationShownIndex: -1,
  hasUnfinishedQuiz: false,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case QuizActions.START_OR_CONTINUE_QUIZ.SUCCESS.type:
        draft.quiz = action.payload.quiz;
        draft.hasUnfinishedQuiz = true;
        break;
      case QuizActions.CHECK_QUIZ_STATUS.SUCCESS.type:
        draft.status = action.payload.status;
        break;
      case QuizActions.SET_QUIZ_NOTIFICATION_SHOWN.STATE.type:
        draft.quizNotificationShownIndex = action.payload.index;
        break;
      case QuizActions.START_OR_CONTINUE_QUIZ.COMPLETED.type:
      case QuizActions.RESET_QUIZ_KYC_STEP.START.type:
        draft.quiz = null;
        draft.hasUnfinishedQuiz = false;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {...INITIAL_STATE};
    }
  });
}

export const quizReducer = persistReducer(
  {
    key: 'quiz',
    storage: AsyncStorage,
    whitelist: ['quizNotificationShownIndex', 'hasUnfinishedQuiz'],
  },
  reducer,
);
