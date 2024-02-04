// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* tryResetKYCStepsSaga({
  payload: {skipKYCSteps},
}: ReturnType<typeof TokenomicsActions.TRY_RESET_KYC_STEPS.START.create>) {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  try {
    const user: SagaReturnType<typeof Api.kyc.tryResetKYCSteps> = yield call(
      Api.kyc.tryResetKYCSteps,
      {userId, skipKYCSteps},
    );
    yield put(TokenomicsActions.TRY_RESET_KYC_STEPS.SUCCESS.create({user}));
  } catch (error) {
    yield put(
      TokenomicsActions.TRY_RESET_KYC_STEPS.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
