// SPDX-License-Identifier: BUSL-1.1

import {StatisticsActions} from '@store/modules/Statistics/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {getTopCountriesSaga} from './getTopCountriesSaga';
import {searchCountriesSaga} from './searchCountriesSaga';

export function* rootStatisticsSaga() {
  yield all([
    takeLatest(
      StatisticsActions.GET_TOP_COUNTRIES.START.type,
      getTopCountriesSaga,
    ),
    takeLatest(
      StatisticsActions.SEARCH_COUNTRIES.START.type,
      searchCountriesSaga,
    ),
  ]);
}
