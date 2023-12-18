// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {StatsActions} from '@store/modules/Stats/actions';
import {getTimezoneOffset} from '@utils/device';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* getUserGrowthStats(
  action: ReturnType<typeof StatsActions.GET_USER_GROWTH_STATS.START.create>,
) {
  const {statsPeriod} = action.payload;
  try {
    const {
      data: userGrowth,
    }: SagaReturnType<typeof Api.statistics.getUserGrowth> = yield call(
      Api.statistics.getUserGrowth,
      {
        days: statsPeriod,
        tz: getTimezoneOffset(),
      },
    );

    yield put(
      StatsActions.GET_USER_GROWTH_STATS.SUCCESS.create(
        statsPeriod,
        userGrowth,
      ),
    );
  } catch (error) {
    yield put(
      StatsActions.GET_USER_GROWTH_STATS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
