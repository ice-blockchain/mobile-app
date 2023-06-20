// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
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

      const data: SagaReturnType<typeof Api.tokenomics.getBalanceHistory> =
        yield call(Api.tokenomics.getBalanceHistory, {
          userId,
          offset: nextPageNumber * PAGE_SIZE,
          startDate,
          endDate,
          limit: PAGE_SIZE,
          tz: getTimezoneOffset(),
        });

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
