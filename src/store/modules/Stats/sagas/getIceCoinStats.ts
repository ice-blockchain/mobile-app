// SPDX-License-Identifier: ice License 1.0

import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {StatsActions} from '@store/modules/Stats/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, select} from 'redux-saga/effects';

export function* getIceCoinStatsSaga() {
  try {
    const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
      isAppActiveSelector,
    );

    if (!isAppActive) {
      return;
    }

    const response: Response = yield call(
      fetch,
      'https://ice-staging.b-cdn.net/assets/auth-config.json',
    );
    // @ts-ignore
    const json = yield response.json();
    yield put(StatsActions.GET_ICE_COIN_STATS.SUCCESS.create({config: json}));
  } catch (error) {
    yield put(
      StatsActions.GET_ICE_COIN_STATS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
