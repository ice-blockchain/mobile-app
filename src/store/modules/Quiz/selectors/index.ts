// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const quizSelector = (state: RootState) => state.quiz.quiz;

export const correctAnswersSelector = (state: RootState) =>
  state.quiz.quiz?.progress?.correctAnswers || 0;

export const incorrectAnswersSelector = (state: RootState) =>
  state.quiz.quiz?.progress?.incorrectAnswers || 0;

export const maxQuestionsCountSelector = (state: RootState) =>
  state.quiz.quiz?.progress?.maxQuestions;

export const currentQuestionCountSelector = (state: RootState) =>
  state.quiz.quiz?.progress?.nextQuestion?.number;

export const questionTitleSelector = (state: RootState) => {
  const question = state.quiz.quiz?.progress?.nextQuestion;
  return question?.text || '';
};

export const questionOptionsSelector = (state: RootState) => {
  const options = state.quiz.quiz?.progress?.nextQuestion?.options;
  return options ?? [];
};

export const expiresAtSelector = (state: RootState) => {
  return state.quiz.quiz?.progress?.expiresAt;
};

export const quizResultSelector = (state: RootState) => {
  return state.quiz.quiz?.result;
};

export const quizStatusSelector = (state: RootState) => {
  return state.quiz.status;
};

export const quizAttemptsLeftSelector = (state: RootState) => {
  return state.quiz.status?.kycQuizRemainingAttempts;
};

export const quizNotificationShownIndexSelector = (state: RootState) => {
  return state.quiz.quizNotificationShownIndex;
};

export const hasUnfinishedQuizSelector = (state: RootState) => {
  return state.quiz.hasUnfinishedQuiz;
};
