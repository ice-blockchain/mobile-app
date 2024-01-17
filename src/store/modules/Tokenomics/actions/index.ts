// SPDX-License-Identifier: ice License 1.0

import {
  BalanceHistoryPoint,
  BalanceSummary,
  FaceAuthKycNumber,
  MiningSummary,
  PreStakingSummary,
  QuizKycStep,
  RankingSummary,
  SocialKycStepNumber,
  TotalCoins,
} from '@api/tokenomics/types';
import {StatsPeriod} from '@store/modules/Stats/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_MINING_SUMMARY = createAction('GET_MINING_SUMMARY', {
  START: true,
  SUCCESS: (payload: {miningSummary: MiningSummary}) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
  RESET: true,
});

const GET_BALANCE_SUMMARY = createAction('GET_BALANCE_SUMMARY', {
  START: true,
  SUCCESS: (balanceSummary: BalanceSummary) => ({balanceSummary}),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const GET_PRE_STAKING_SUMMARY = createAction('GET_PRE_STAKING_SUMMARY', {
  START: true,
  SUCCESS: (preStakingSummary: PreStakingSummary | null) => ({
    preStakingSummary,
  }),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const GET_RANKING_SUMMARY = createAction('GET_RANKING_SUMMARY', {
  START: (payload?: {userId: string}) => payload,
  SUCCESS: (payload: {userId: string; rankingSummary: RankingSummary | null}) =>
    payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const GET_BALANCE_HISTORY = createAction('GET_BALANCE_HISTORY', {
  START: (payload: {isInitial: boolean; startDate: string; endDate: string}) =>
    payload,
  SUCCESS: (payload: {
    pageNumber: number;
    startDate: string;
    endDate: string;
    hasNext: boolean;
    data: BalanceHistoryPoint[];
  }) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const START_MINING_SESSION = createAction('START_MINING_SESSION', {
  START: (params?: {
    resurrect?: boolean;
    tapToMineActionType?: 'Extended' | 'Default';
    skipKYCStep?: FaceAuthKycNumber | SocialKycStepNumber | QuizKycStep;
  }) => params,
  SUCCESS: (miningSummary: MiningSummary | null) => ({miningSummary}),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const START_OR_UPDATE_PRE_STAKING = createAction(
  'START_OR_UPDATE_PRE_STAKING',
  {
    START: (params: {years: number; allocation: number}) => params,
    SUCCESS: (preStakingSummary: PreStakingSummary) => ({preStakingSummary}),
    FAILED: (errorMessage: string) => ({errorMessage}),
  },
);

const CLAIM_DAILY_BONUS = createAction('CLAIM_DAILY_BONUS', {
  STATE: true,
});

const GET_TOTAL_COINS_STATS = createAction('GET_TOTAL_COINS_STATS', {
  START: (statsPeriod: StatsPeriod) => ({statsPeriod}),
  SUCCESS: (statsPeriod: StatsPeriod, totalCoins: TotalCoins) => ({
    statsPeriod,
    totalCoins,
  }),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const TokenomicsActions = Object.freeze({
  GET_MINING_SUMMARY,
  GET_BALANCE_SUMMARY,
  GET_PRE_STAKING_SUMMARY,
  GET_RANKING_SUMMARY,
  GET_BALANCE_HISTORY,
  START_MINING_SESSION,
  START_OR_UPDATE_PRE_STAKING,
  CLAIM_DAILY_BONUS,
  GET_TOTAL_COINS_STATS,
});
