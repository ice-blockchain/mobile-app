// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {getTimezoneOffset} from '@utils/device';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* getTotalCoinsStatsSaga(
  action: ReturnType<
    typeof TokenomicsActions.GET_TOTAL_COINS_STATS.START.create
  >,
) {
  const {statsPeriod} = action.payload;
  try {
    const {
      data: totalCoins,
    }: SagaReturnType<typeof Api.tokenomics.getTotalCoins> = yield call(
      Api.tokenomics.getTotalCoins,
      {
        days: statsPeriod,
        tz: getTimezoneOffset(),
      },
    );
    yield put(
      TokenomicsActions.GET_TOTAL_COINS_STATS.SUCCESS.create(
        statsPeriod,
        totalCoins,
      ),
    );
  } catch (error) {
    yield put(
      TokenomicsActions.GET_TOTAL_COINS_STATS.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
