// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {StatsActions} from '@store/modules/Stats/actions';
import {getAdoptionSaga} from '@store/modules/Stats/sagas/getAdoption';
import {getIceCoinStatsSaga} from '@store/modules/Stats/sagas/getIceCoinStats';
import {getUserGrowthStats} from '@store/modules/Stats/sagas/getUserGrowthStats';
import {takeLatest} from 'redux-saga/effects';

export const statsWatchers = [
  takeLatest(StatsActions.GET_USER_GROWTH_STATS.START.type, getUserGrowthStats),
  takeLatest(
    [
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
      AppCommonActions.INTERVAL_UPDATE.STATE.type,
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      StatsActions.GET_ADOPTION.START.type,
    ],
    getAdoptionSaga,
  ),
  takeLatest(
    [
      StatsActions.GET_ICE_COIN_STATS.START.type,
      AppCommonActions.APP_LOADED.STATE.type,
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
    ],
    getIceCoinStatsSaga,
  ),
];
