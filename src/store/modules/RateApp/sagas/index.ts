// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {RateAppActions} from '@store/modules/RateApp/actions';
import {checkRateAppConditionSaga} from '@store/modules/RateApp/sagas/checkRateAppConditionSaga';
import {showRateAppSaga} from '@store/modules/RateApp/sagas/showRateAppSaga';
import {takeLatest, takeLeading} from 'redux-saga/effects';

export const rateAppWatchers = [
  takeLeading(RateAppActions.SHOW_RATE_APP.START.type, showRateAppSaga),
  takeLatest(
    [
      AppCommonActions.APP_LOADED.STATE.type,
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
    ],
    checkRateAppConditionSaga,
  ),
];
