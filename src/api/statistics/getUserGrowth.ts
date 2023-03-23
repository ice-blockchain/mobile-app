// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {UserGrowth} from '@api/statistics/types';

type Params = {
  days: number;
  tz: string;
};

export function getUserGrowth({days, tz}: Params) {
  return get<UserGrowth>('/user-statistics/user-growth', {
    days,
    tz,
  });
}
