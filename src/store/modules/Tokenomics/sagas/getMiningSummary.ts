// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getMiningSummarySaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
      isAppActiveSelector,
    );

    if (!isAuthorized || !isAppActive) {
      return null;
    }

    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    const {
      data: miningSummary,
    }: SagaReturnType<typeof Api.tokenomics.getMiningSummary> = yield call(
      Api.tokenomics.getMiningSummary,
      {userId},
    );

    yield put(
      TokenomicsActions.GET_MINING_SUMMARY.SUCCESS.create({
        miningSummary,
      }),
    );
  } catch (error) {
    yield put(
      TokenomicsActions.GET_MINING_SUMMARY.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
