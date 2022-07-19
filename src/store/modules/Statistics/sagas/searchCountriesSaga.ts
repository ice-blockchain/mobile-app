// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {StatisticsActions} from '@store/modules/Statistics/actions';
import {Country} from '@store/modules/Statistics/reducer';
import {put} from 'redux-saga/effects';

const actionCreator = StatisticsActions.SEARCH_COUNTRIES.START.create;

export function* searchCountriesSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {query} = action.payload;
    const response: Country[] = yield Api.statistics.getTopCountries({
      query,
    });
    yield put(StatisticsActions.SEARCH_COUNTRIES.SUCCESS.create(response));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(StatisticsActions.SEARCH_COUNTRIES.FAILED.create(errorMessage));
  }
}
