// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {getBalanceHistoryLength} from '@store/modules/Tokenomics/utils/getBalanceHistoryLength';
import {getTimezoneOffset} from '@utils/device';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const PAGE_SIZE = 24;

export function* getBalanceHistorySaga({
  payload: {offset, startDate, endDate},
}: ReturnType<typeof TokenomicsActions.GET_BALANCE_HISTORY.START.create>) {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );

    if (isAuthorized) {
      const userId: ReturnType<typeof userIdSelector> = yield select(
        userIdSelector,
      );

      const data: SagaReturnType<typeof Api.tokenomics.getBalanceHistory> =
        yield call(Api.tokenomics.getBalanceHistory, {
          userId,
          offset,
          startDate,
          endDate,
          limit: PAGE_SIZE,
          tz: getTimezoneOffset(),
        });

      yield put(
        TokenomicsActions.GET_BALANCE_HISTORY.SUCCESS.create({
          offset,
          startDate,
          endDate,
          data,
          hasNext: getBalanceHistoryLength(data) === PAGE_SIZE,
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
