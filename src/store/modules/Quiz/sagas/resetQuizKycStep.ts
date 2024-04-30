// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {QUIZ_KYC_STEP} from '@api/tokenomics/constants';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {QuizActions} from '@store/modules/Quiz/actions';
import {hasUnfinishedQuizSelector} from '@store/modules/Quiz/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

type Action = ReturnType<
  | typeof AppCommonActions.APP_INITIALIZED.SUCCESS.create
  | typeof QuizActions.RESET_QUIZ_KYC_STEP.START.create
>;

export function* resetQuizKycStepSaga(action: Action) {
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );

  if (!isAuthorized) {
    return;
  }

  if (action.type === AppCommonActions.APP_INITIALIZED.SUCCESS.type) {
    const hasUnfinishedQuiz: ReturnType<typeof hasUnfinishedQuizSelector> =
      yield select(hasUnfinishedQuizSelector);
    if (!hasUnfinishedQuiz) {
      return;
    }
  }

  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  try {
    const user: SagaReturnType<typeof Api.kyc.tryResetKYCSteps> = yield call(
      Api.kyc.tryResetKYCSteps,
      {userId, skipKYCSteps: [QUIZ_KYC_STEP]},
    );
    yield put(QuizActions.RESET_QUIZ_KYC_STEP.SUCCESS.create({user}));
  } catch (error) {
    yield put(
      QuizActions.RESET_QUIZ_KYC_STEP.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
