// SPDX-License-Identifier: ice License 1.0

import {claimExtraBonus} from './claimExtraBonus';
import {getBalanceHistory} from './getBalanceHistory';
import {getBalanceSummary} from './getBalanceSummary';
import {getMiningSummary} from './getMiningSummary';
import {getPreStakingSummary} from './getPreStakingSummary';
import {getRankingSummary} from './getRankingSummary';
import {getTotalCoins} from './getTotalCoins';
import {startMiningSession} from './startMiningSession';
import {startOrUpdatePreStaking} from './startOrUpdatePreStaking';

export const tokenomics = Object.freeze({
  getMiningSummary,
  getBalanceSummary,
  startMiningSession,
  getPreStakingSummary,
  getRankingSummary,
  getBalanceHistory,
  startOrUpdatePreStaking,
  claimExtraBonus,
  getTotalCoins,
});
