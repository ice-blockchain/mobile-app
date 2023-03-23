// SPDX-License-Identifier: ice License 1.0

import {Adoption, UserGrowth} from '@api/statistics/types';
import {StatsPeriod} from '@store/modules/Stats/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_USER_GROWTH_STATS = createAction('GET_USER_GROWTH_STATS', {
  START: (statsPeriod: StatsPeriod) => ({statsPeriod}),
  SUCCESS: (statsPeriod: StatsPeriod, userGrowth: UserGrowth) => ({
    statsPeriod,
    userGrowth,
  }),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const GET_ADOPTION = createAction('GET_ADOPTION', {
  START: true,
  SUCCESS: (adoption: Adoption) => ({adoption}),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const StatsActions = Object.freeze({
  GET_USER_GROWTH_STATS,
  GET_ADOPTION,
});
