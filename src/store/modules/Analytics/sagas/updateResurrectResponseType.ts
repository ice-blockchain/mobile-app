// SPDX-License-Identifier: ice License 1.0

import {Attributes} from '@services/analytics';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import {call, put} from 'redux-saga/effects';

type Actions = ReturnType<
  typeof AnalyticsActions.UPDATE_RESURRECT_RESPONSE_TYPE.START.create
>;

export function* updateResurrectResponseTypeSaga(action: Actions) {
  const resurrectResponseType = action.payload?.resurrectResponseType ?? 'NULL';
  yield call(Attributes.trackUserAttribute, 'Resurrect', resurrectResponseType);
  yield put(AnalyticsActions.UPDATE_RESURRECT_RESPONSE_TYPE.SUCCESS.create());
}
