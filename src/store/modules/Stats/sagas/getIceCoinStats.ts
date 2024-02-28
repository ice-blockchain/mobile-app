// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {StatsActions} from '@store/modules/Stats/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getIceCoinStatsSaga() {
  try {
    const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
      isAppActiveSelector,
    );

    if (!isAppActive) {
      return;
    }

    const {data: config}: SagaReturnType<typeof Api.auth.getConfig> =
      yield call(Api.auth.getConfig);
    yield put(StatsActions.GET_ICE_COIN_STATS.SUCCESS.create({config}));
  } catch (error) {
    yield put(
      StatsActions.GET_ICE_COIN_STATS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
