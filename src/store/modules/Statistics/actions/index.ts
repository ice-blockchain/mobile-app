// SPDX-License-Identifier: BUSL-1.1

import {Country} from '@store/modules/Statistics/reducer';
import {createAction} from '@store/utils/actions/createAction';

const GET_TOP_COUNTRIES = createAction('GET_TOP_COUNTRIES', {
  START: (query: string, offset?: number, limit?: number) => ({
    query,
    limit,
    offset,
  }),
  SUCCESS: (topCountries: Country[]) => ({topCountries}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});
const SEARCH_COUNTRIES = createAction('SEARCH_COUNTRIES', {
  START: (query: string) => ({
    query,
  }),
  SUCCESS: (searchedCountries: Country[]) => ({searchedCountries}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

export const StatisticsActions = Object.freeze({
  GET_TOP_COUNTRIES,
  SEARCH_COUNTRIES,
});
