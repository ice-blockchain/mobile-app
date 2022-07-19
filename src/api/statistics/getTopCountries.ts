// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {CountryStatistics} from '@api/statistics/types';

/**
 * Returns the paginated view of users per country.
 */
type Params = {
  query: string;
  offset?: number;
  limit?: number;
};

export function getTopCountries({query = '', offset = 0, limit = 10}: Params) {
  return get<CountryStatistics>(
    `/user-statistics/top-countries?keyword=${query}&limit=${limit}&offset=${offset}`,
  );
}
