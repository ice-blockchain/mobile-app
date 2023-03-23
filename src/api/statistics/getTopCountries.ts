// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {CountryStatistics} from '@api/statistics/types';

/**
 * Returns the paginated view of users per country.
 */

type Params = {
  query: string;
  limit?: number;
  offset?: number;
};

export function getTopCountries({query, limit = 10, offset = 0}: Params) {
  return get<CountryStatistics[]>('/user-statistics/top-countries', {
    keyword: encodeURIComponent(query),
    limit,
    offset,
  });
}
