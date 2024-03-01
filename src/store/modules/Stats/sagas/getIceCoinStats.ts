// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {StatsActions} from '@store/modules/Stats/actions';
import {IceCoinStats} from '@store/modules/Stats/types';
import {getErrorMessage} from '@utils/errors';
import axios, {AxiosResponse} from 'axios';
import {call, put, select} from 'redux-saga/effects';

export function* getIceCoinStatsSaga() {
  try {
    const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
      isAppActiveSelector,
    );

    if (!isAppActive) {
      return;
    }

    const {data}: AxiosResponse<IceCoinStats> = yield call(
      axios,
      LINKS.ICE_COIN_STATS,
    );

    yield put(StatsActions.GET_ICE_COIN_STATS.SUCCESS.create({stats: data}));
  } catch (error) {
    yield put(
      StatsActions.GET_ICE_COIN_STATS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
