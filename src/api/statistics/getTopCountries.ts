// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';

export default function getTopCountries() {
  return get('/user-statistics/top-countries');
}
