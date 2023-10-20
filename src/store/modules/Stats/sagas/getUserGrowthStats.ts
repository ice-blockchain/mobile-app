// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {StatsActions} from '@store/modules/Stats/actions';
import {getErrorMessage} from '@utils/errors';
import {put} from 'redux-saga/effects';

export function* getUserGrowthStats(
  action: ReturnType<typeof StatsActions.GET_USER_GROWTH_STATS.START.create>,
) {
  const {statsPeriod} = action.payload;
  try {
    // const {
    //   data: userGrowth,
    // }: SagaReturnType<typeof Api.statistics.getUserGrowth> = yield call(
    //   Api.statistics.getUserGrowth,
    //   {
    //     days: statsPeriod,
    //     tz: getTimezoneOffset(),
    //   },
    // );

    //TODO::mock data
    const userGrowth = {
      active: 1000,
      total: 230102,
      timeSeries: Array(statsPeriod)
        .fill(null)
        .map((_, index) => ({
          date: dayjs().subtract(index, 'day').toISOString(),
          active: Math.floor(Math.random() * 10000),
          total: Math.floor(Math.random() * 10000),
        })),
    };

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
