// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {CountryStatistics} from '@api/statistics/types';

/**
 * Returns the paginated view of users per country.
 */

export function getTopCountries() {
  return get<CountryStatistics>('/user-statistics/top-countries');
}
