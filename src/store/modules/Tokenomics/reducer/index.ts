// SPDX-License-Identifier: ice License 1.0

import {
  BalanceHistoryPoint,
  BalanceSummary,
  MiningSummary,
  PreStakingSummary,
  RankingSummary,
} from '@api/tokenomics/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Account/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  miningSummary: MiningSummary | null;
  balanceSummary: BalanceSummary | null;
  preStakingSummary: PreStakingSummary | null;
  rankingSummary: {
    [userId: string]: RankingSummary | null;
  };
  balanceHistory: {
    data: BalanceHistoryPoint[] | null;
    hasNext: boolean;
    startDate: string | null;
    endDate: string | null;
    pageNumber: number;
  };
  agreeWithEarlyAccess: boolean;
  forceStartMining: boolean;
  tapToMineActionType?: 'Extended' | 'Default';
}

type Actions = ReturnType<
  | typeof TokenomicsActions.GET_MINING_SUMMARY.SUCCESS.create
  | typeof TokenomicsActions.START_MINING_SESSION.SUCCESS.create
  | typeof TokenomicsActions.GET_BALANCE_SUMMARY.SUCCESS.create
  | typeof TokenomicsActions.GET_PRE_STAKING_SUMMARY.SUCCESS.create
  | typeof TokenomicsActions.GET_RANKING_SUMMARY.SUCCESS.create
  | typeof TokenomicsActions.GET_BALANCE_HISTORY.SUCCESS.create
  | typeof TokenomicsActions.START_OR_UPDATE_PRE_STAKING.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
  | typeof TokenomicsActions.UPDATE_AGREE_WITH_EARLY_ACCESS.STATE.create
  | typeof TokenomicsActions.UPDATE_FORCE_START_MINING.STATE.create
>;

const INITIAL_STATE: State = {
  miningSummary: null,
  balanceSummary: null,
  preStakingSummary: null,
  rankingSummary: {},
  balanceHistory: {
    data: null,
    hasNext: true,
    startDate: null,
    endDate: null,
    pageNumber: 0,
  },
  agreeWithEarlyAccess: false,
  forceStartMining: false,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case TokenomicsActions.GET_MINING_SUMMARY.SUCCESS.type:
      case TokenomicsActions.START_MINING_SESSION.SUCCESS.type:
        draft.miningSummary = action.payload.miningSummary;
        break;

      case TokenomicsActions.GET_BALANCE_SUMMARY.SUCCESS.type:
        draft.balanceSummary = action.payload.balanceSummary;
        break;

      case TokenomicsActions.GET_PRE_STAKING_SUMMARY.SUCCESS.type:
      case TokenomicsActions.START_OR_UPDATE_PRE_STAKING.SUCCESS.type:
        draft.preStakingSummary = action.payload.preStakingSummary;
        break;

      case TokenomicsActions.GET_RANKING_SUMMARY.SUCCESS.type:
        draft.rankingSummary[action.payload.userId] =
          action.payload.rankingSummary;
        break;
      case TokenomicsActions.GET_BALANCE_HISTORY.SUCCESS.type:
        const {pageNumber, startDate, endDate, hasNext, data} = action.payload;
        if (pageNumber === 0) {
          draft.balanceHistory = {
            startDate,
            endDate,
            hasNext,
            data,
            pageNumber,
          };
        } else {
          const currentHistory = state.balanceHistory.data ?? [];
          const lastCurrentHistoryItem = currentHistory.slice(-1)[0];
          const firstIncomingHistoryItem = data[0];
          let mergedHistory: BalanceHistoryPoint[] = [];

          if (lastCurrentHistoryItem?.time === firstIncomingHistoryItem?.time) {
            mergedHistory = [
              ...currentHistory.slice(0, currentHistory.length - 1),
              {
                ...lastCurrentHistoryItem,
                timeSeries: [
                  ...(lastCurrentHistoryItem.timeSeries ?? []),
                  ...(firstIncomingHistoryItem.timeSeries ?? []),
                ],
              },
              ...data.slice(1),
            ];
          } else {
            mergedHistory = [...currentHistory, ...data];
          }

          draft.balanceHistory = {
            startDate,
            endDate,
            hasNext,
            data: mergedHistory,
            pageNumber,
          };
        }
        break;
      case TokenomicsActions.UPDATE_AGREE_WITH_EARLY_ACCESS.STATE.type:
        draft.agreeWithEarlyAccess = true;
        break;
      case TokenomicsActions.UPDATE_FORCE_START_MINING.STATE.type:
        draft.forceStartMining = action.payload.forceStartMining;
        draft.tapToMineActionType = action.payload.tapToMineActionType;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type:
        return INITIAL_STATE;
    }
  });
}

export const tokenomicsReducer = persistReducer(
  {
    key: 'tokenomics',
    storage: AsyncStorage,
    whitelist: ['agreeWithEarlyAccess'],
  },
  reducer,
);
