// SPDX-License-Identifier: BUSL-1.1

import Api from '@api/index';
import {put} from 'redux-saga/effects';
import StatisticsActions from '../actions';
import {Country} from '../reducer';

export default function* getTopCountriesSaga() {
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
