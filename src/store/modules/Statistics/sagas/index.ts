// SPDX-License-Identifier: BUSL-1.1

import {all, takeLatest} from 'redux-saga/effects';
import {getTopCountriesSaga} from './getTopCountriesSaga';
import {StatisticsActions} from '../actions';

export function* rootStatisticsSaga() {
  yield all([
    takeLatest(
      StatisticsActions.GET_TOP_COUNTRIES.START.type,
      getTopCountriesSaga,
    ),
  ]);
}
