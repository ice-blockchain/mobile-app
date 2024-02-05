// SPDX-License-Identifier: ice License 1.0

export type Quiz = {
  progress?: QuizProgress;
  result?: QuizResult;
};

export type QuizProgress = {
  correctAnswers: number;
  expiresAt: string;
  incorrectAnswers: number;
  maxQuestions: number;
  nextQuestion: Question;
};

export type QuizResult = 'SUCCESS' | 'FAILURE';

export type Question = {
  number: number;
  options: string[];
  text: string;
};

export type QuizStatus = {
  kycQuizAvailabilityStartedAt: string;
  kycQuizAvailabilityEndedAt: string;
  kycQuizAvailable: boolean;
  kycQuizCompleted: boolean;
  kycQuizDisabled: boolean;
  kycQuizRemainingAttempts?: number;
};
