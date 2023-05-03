// SPDX-License-Identifier: ice License 1.0

import {
  forceStartMiningSelector,
  isAppActiveSelector,
} from '@store/modules/AppCommon/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {put, select} from 'redux-saga/effects';

export function* forceMiningSaga() {
  const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
    isAppActiveSelector,
  );

  const forceStartMining: ReturnType<typeof forceStartMiningSelector> =
    yield select(forceStartMiningSelector);

  if (isAppActive && forceStartMining) {
    console.log('forceMiningSaga STARTED');
    yield put(TokenomicsActions.START_MINING_SESSION.START.create());
  }
}
