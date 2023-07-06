// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getPreStakingSummarySaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );

    if (isAuthorized) {
      const userId: ReturnType<typeof userIdSelector> = yield select(
        userIdSelector,
      );
      const {
        data: preStakingSummary,
      }: SagaReturnType<typeof Api.tokenomics.getPreStakingSummary> =
        yield call(Api.tokenomics.getPreStakingSummary, {userId});

      yield put(
        TokenomicsActions.GET_PRE_STAKING_SUMMARY.SUCCESS.create(
          preStakingSummary,
        ),
      );
    }
  } catch (error) {
    if (isApiError(error, 404, 'PRE_STAKING_NOT_ENABLED')) {
      yield put(TokenomicsActions.GET_PRE_STAKING_SUMMARY.SUCCESS.create(null));
    } else {
      yield put(
        TokenomicsActions.GET_PRE_STAKING_SUMMARY.FAILED.create(
          getErrorMessage(error),
        ),
      );
      throw error;
    }
  }
}
