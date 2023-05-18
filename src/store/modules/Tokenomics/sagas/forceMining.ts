// SPDX-License-Identifier: ice License 1.0

import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {forceStartMiningSelector} from '@store/modules/Tokenomics/selectors';
import {put, select} from 'redux-saga/effects';

export function* forceMiningSaga() {
  const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
    isAppActiveSelector,
  );

  const forceStartMining: ReturnType<typeof forceStartMiningSelector> =
    yield select(forceStartMiningSelector);

  if (isAppActive && forceStartMining) {
    yield put(TokenomicsActions.START_MINING_SESSION.START.create());
  }
}
