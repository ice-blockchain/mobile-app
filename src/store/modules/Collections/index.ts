// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {CountryStatistics, Miner} from '@api/statistics/types';
import {User} from '@api/user/types';
import {createCollectionAction} from '@store/modules/Collections/actions';
import {getInitialCollectionState} from '@store/modules/Collections/reducer';
import {AxiosResponse} from 'axios';

export const CollectionActions = {
  GET_TOP_STATS_COUNTRIES: createCollectionAction<
    CountryStatistics,
    'GET_TOP_STATS_COUNTRIES'
  >('GET_TOP_STATS_COUNTRIES'),
  SEARCH_STATS_COUNTRIES: createCollectionAction<
    CountryStatistics,
    'SEARCH_STATS_COUNTRIES'
  >('SEARCH_STATS_COUNTRIES'),
  GET_TOP_MINERS: createCollectionAction<Miner, 'GET_TOP_MINERS'>(
    'GET_TOP_MINERS',
  ),
  SEARCH_MINERS: createCollectionAction<Miner, 'SEARCH_MINERS'>(
    'SEARCH_MINERS',
  ),
  SEARCH_USERS: createCollectionAction<User, 'SEARCH_USERS'>('SEARCH_USERS'),
} as const;

export const CollectionsState = {
  topStatsCountries: getInitialCollectionState<CountryStatistics>(),
  statsCountriesSearch: getInitialCollectionState<CountryStatistics>(),
  topMiners: getInitialCollectionState<Miner>(),
  minersSearch: getInitialCollectionState<Miner>(),
  usersSearch: getInitialCollectionState<User>(),
} as const;

export const actionsMap = new Map<
  CollectionAction,
  {
    stateKey: keyof typeof CollectionsState;
    request: CollectionApiRequest;
    defaultPageSize: number;
  }
>([]);
actionsMap.set(CollectionActions.GET_TOP_STATS_COUNTRIES, {
  stateKey: 'topStatsCountries',
  request: Api.statistics.getTopCountries,
  defaultPageSize: 20,
});
actionsMap.set(CollectionActions.SEARCH_STATS_COUNTRIES, {
  stateKey: 'statsCountriesSearch',
  request: Api.statistics.getTopCountries,
  defaultPageSize: 20,
});
actionsMap.set(CollectionActions.GET_TOP_MINERS, {
  stateKey: 'topMiners',
  request: Api.statistics.getTopMiners,
  defaultPageSize: 20,
});
actionsMap.set(CollectionActions.SEARCH_MINERS, {
  stateKey: 'minersSearch',
  request: Api.statistics.getTopMiners,
  defaultPageSize: 20,
});
actionsMap.set(CollectionActions.SEARCH_USERS, {
  stateKey: 'usersSearch',
  request: Api.user.searchUsers,
  defaultPageSize: 30,
});

export type CollectionAction =
  typeof CollectionActions[keyof typeof CollectionActions];

export type CollectionApiRequest = (params: {
  query: string;
  limit: number;
  offset: number;
}) => Promise<
  AxiosResponse<typeof CollectionsState[keyof typeof CollectionsState]['data']>
>;
