// SPDX-License-Identifier: ice License 1.0

import {isLightDesign} from '@constants/featureFlags';
import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {getBalanceHistorySaga} from '@store/modules/Tokenomics/sagas/getBalanceHistory';
import {getBalanceSummarySaga} from '@store/modules/Tokenomics/sagas/getBalanceSummary';
import {getMiningSummarySaga} from '@store/modules/Tokenomics/sagas/getMiningSummary';
import {getPreStakingSummarySaga} from '@store/modules/Tokenomics/sagas/getPreStakingSummary';
import {getRankingSummarySaga} from '@store/modules/Tokenomics/sagas/getRankingSummary';
import {getTotalCoinsStatsSaga} from '@store/modules/Tokenomics/sagas/getTotalCoinsStats';
import {handleExtraBonusSaga} from '@store/modules/Tokenomics/sagas/handleExtraBonus';
import {startMiningSessionSaga} from '@store/modules/Tokenomics/sagas/startMiningSession';
import {startOrUpdatePreStakingSaga} from '@store/modules/Tokenomics/sagas/startPreStaking';
import {takeLatest, takeLeading} from 'redux-saga/effects';

export const tokenomicsWatchers = [
  takeLatest(
    [
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
      AppCommonActions.INTERVAL_UPDATE.STATE.type,
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      TokenomicsActions.GET_MINING_SUMMARY.START.type,
      TokenomicsActions.START_OR_UPDATE_PRE_STAKING.SUCCESS.type,
    ],
    getMiningSummarySaga,
  ),
  takeLatest(
    [
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
      AppCommonActions.INTERVAL_UPDATE.STATE.type,
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      TokenomicsActions.GET_BALANCE_SUMMARY.START.type,
    ],
    getBalanceSummarySaga,
  ),
  takeLatest(
    [
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      TokenomicsActions.GET_PRE_STAKING_SUMMARY.START.type,
    ],
    getPreStakingSummarySaga,
  ),
  takeLatest(
    [
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
      AppCommonActions.INTERVAL_UPDATE.STATE.type,
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      TokenomicsActions.GET_RANKING_SUMMARY.START.type,
    ],
    getRankingSummarySaga,
  ),
  takeLatest(
    TokenomicsActions.START_MINING_SESSION.START.type,
    startMiningSessionSaga,
  ),
  takeLatest(
    TokenomicsActions.START_OR_UPDATE_PRE_STAKING.START.type,
    startOrUpdatePreStakingSaga,
  ),
  takeLatest(
    TokenomicsActions.GET_BALANCE_HISTORY.START.type,
    getBalanceHistorySaga,
  ),
  takeLeading(
    isLightDesign
      ? []
      : [
          TokenomicsActions.GET_MINING_SUMMARY.SUCCESS.type,
          TokenomicsActions.CLAIM_DAILY_BONUS.STATE.type,
        ],
    handleExtraBonusSaga,
  ),
  takeLatest(
    TokenomicsActions.GET_TOTAL_COINS_STATS.START.type,
    getTotalCoinsStatsSaga,
  ),
];
