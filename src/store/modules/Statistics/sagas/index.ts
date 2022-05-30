// SPDX-License-Identifier: BUSL-1.1

import {all, takeLatest} from 'redux-saga/effects';

import {StatisticsActions} from '../actions';
import {getTopCountriesSaga} from './getTopCountriesSaga';

export function* rootStatisticsSaga() {
  yield all([
    takeLatest(
      StatisticsActions.GET_TOP_COUNTRIES.START.type,
      getTopCountriesSaga,
    ),
  ]);
}
