// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {StatisticsActions} from '@store/modules/Statistics/actions';
import {Country} from '@store/modules/Statistics/reducer';
import {put} from 'redux-saga/effects';

export function* getTopCountriesSaga() {
  try {
    const response: Country[] = yield Api.statistics.getTopCountries();
    yield put(StatisticsActions.GET_TOP_COUNTRIES.SUCCESS.create(response));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(StatisticsActions.GET_TOP_COUNTRIES.FAILED.create(errorMessage));
  }
}
