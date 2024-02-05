// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {
  isAuthorizedSelector,
  unsafeUserSelector,
} from '@store/modules/Account/selectors';
import {QuizActions} from '@store/modules/Quiz/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* checkQuizStatusSaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );

    if (!isAuthorized) {
      return;
    }

    const user: SagaReturnType<typeof unsafeUserSelector> = yield select(
      unsafeUserSelector,
    );

    const status: SagaReturnType<typeof Api.kyc.checkKYCStep4Status> =
      yield call(Api.kyc.checkKYCStep4Status, {userId: user.id});

    yield put(QuizActions.CHECK_QUIZ_STATUS.SUCCESS.create({status}));
  } catch (error: unknown) {
    yield put(
      QuizActions.CHECK_QUIZ_STATUS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
