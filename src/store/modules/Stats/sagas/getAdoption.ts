// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {isAuthorizedSelector} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {StatsActions} from '@store/modules/Stats/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getAdoptionSaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
      isAppActiveSelector,
    );

    if (!isAuthorized || !isAppActive) {
      return null;
    }

    const adoption: SagaReturnType<typeof Api.statistics.getAdoption> =
      yield call(Api.statistics.getAdoption);

    yield put(StatsActions.GET_ADOPTION.SUCCESS.create(adoption));
  } catch (error) {
    yield put(StatsActions.GET_ADOPTION.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}
