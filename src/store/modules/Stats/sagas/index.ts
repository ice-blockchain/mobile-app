// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {StatsActions} from '@store/modules/Stats/actions';
import {getIceCoinStatsSaga} from '@store/modules/Stats/sagas/getIceCoinStats';
import {takeLatest} from 'redux-saga/effects';

export const statsWatchers = [
  takeLatest(
    [
      StatsActions.GET_ICE_COIN_STATS.START.type,
      AppCommonActions.APP_LOADED.STATE.type,
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
    ],
    getIceCoinStatsSaga,
  ),
];
