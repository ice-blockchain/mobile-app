// SPDX-License-Identifier: ice License 1.0

import {RateAppActions} from '@store/modules/RateApp/actions';
import {RateAppSelectors} from '@store/modules/RateApp/selectors';
import {miningSummarySelector} from '@store/modules/Tokenomics/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const START_MINING_COUNT = 3;

export function* checkRateAppConditionSaga() {
  let isRateAppShown: SagaReturnType<typeof RateAppSelectors.isRateAppShown> =
    yield select(RateAppSelectors.isRateAppShown);

  while (!isRateAppShown) {
    const initialMiningSummary: ReturnType<typeof miningSummarySelector> =
      yield select(miningSummarySelector);

    yield call(waitForSelector, state => {
      return (
        miningSummarySelector(state)?.miningStreak !==
        initialMiningSummary?.miningStreak
      );
    });

    const miningSummary: ReturnType<typeof miningSummarySelector> =
      yield select(miningSummarySelector);

    const miningStreak = miningSummary?.miningStreak ?? 0;

    isRateAppShown = yield select(RateAppSelectors.isRateAppShown);

    if (
      !isRateAppShown &&
      miningStreak >= START_MINING_COUNT &&
      miningStreak % START_MINING_COUNT === 0
    ) {
      yield put(RateAppActions.SHOW_RATE_APP.START.create());
    }
  }
}
