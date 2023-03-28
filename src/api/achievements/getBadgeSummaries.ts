// SPDX-License-Identifier: ice License 1.0

import {BadgeSummary} from '@api/achievements/types';
import {get} from '@api/client';

interface Params {
  userId: string;
}

export function getBadgeSummaries({userId}: Params) {
  return get<BadgeSummary[]>(`/achievement-summaries/badges/users/${userId}`);
}
