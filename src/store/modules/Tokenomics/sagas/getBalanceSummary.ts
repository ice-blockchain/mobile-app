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

let i = 0;

export function* getBalanceSummarySaga() {
  try {
    i = i + 1;
    if (i % 3 === 0) {
      throw 1;
    }

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
    const balanceSummary: SagaReturnType<
      typeof Api.tokenomics.getBalanceSummary
    > = yield call(Api.tokenomics.getBalanceSummary, {userId});

    yield put(
      TokenomicsActions.GET_BALANCE_SUMMARY.SUCCESS.create(balanceSummary),
    );
  } catch (error) {
    yield put(
      TokenomicsActions.GET_BALANCE_SUMMARY.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
