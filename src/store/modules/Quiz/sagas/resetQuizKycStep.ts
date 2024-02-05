// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {QUIZ_KYC_STEP} from '@api/tokenomics/constants';
import {userIdSelector} from '@store/modules/Account/selectors';
import {QuizActions} from '@store/modules/Quiz/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* resetQuizKycStepSaga() {
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
