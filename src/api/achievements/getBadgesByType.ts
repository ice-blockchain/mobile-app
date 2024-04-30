// SPDX-License-Identifier: ice License 1.0

import {Badge, BadgeType} from '@api/achievements/types';
import {get} from '@api/client';

interface Params {
  userId: string;
  type: BadgeType;
}

export function getBadgesByType({type, userId}: Params) {
  return get<Badge[]>(`/badges/${type}/users/${userId}`);
}
