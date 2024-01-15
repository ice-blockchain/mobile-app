// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {logError} from '@services/logging';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {balanceHistorySelector} from '@store/modules/Tokenomics/selectors';
import {getBalanceHistoryLength} from '@store/modules/Tokenomics/utils/getBalanceHistoryLength';
import {getTimezoneOffset} from '@utils/device';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const PAGE_SIZE = 24;

export function* getBalanceHistorySaga({
  payload: {isInitial, startDate, endDate},
}: ReturnType<typeof TokenomicsActions.GET_BALANCE_HISTORY.START.create>) {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    const {pageNumber}: ReturnType<typeof balanceHistorySelector> =
      yield select(balanceHistorySelector);
    const nextPageNumber = isInitial ? 0 : pageNumber + 1;

    if (isAuthorized) {
      const userId: ReturnType<typeof userIdSelector> = yield select(
        userIdSelector,
      );

      const response: SagaReturnType<typeof Api.tokenomics.getBalanceHistory> =
        yield call(Api.tokenomics.getBalanceHistory, {
          userId,
          offset: nextPageNumber * PAGE_SIZE,
          startDate,
          endDate,
          limit: PAGE_SIZE,
          tz: getTimezoneOffset(),
        });

      let data = response.data ?? [];

      // TODO:: remove when data.reduce -> undefined is not a function error (getBalanceHistoryLength) in Sentry is resolved
      if (!Array.isArray(data)) {
        logError(new Error('Incorrect getBalanceHistory response type'), {
          type: typeof response.data,
          data: response.data,
        });
        data = [];
      }

      yield put(
        TokenomicsActions.GET_BALANCE_HISTORY.SUCCESS.create({
          pageNumber: nextPageNumber,
          startDate,
          endDate,
          data,
          hasNext: !!getBalanceHistoryLength(data),
        }),
      );
    }
  } catch (error) {
    yield put(
      TokenomicsActions.GET_BALANCE_HISTORY.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
