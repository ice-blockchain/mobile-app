// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';

import {LevelsAndRoles} from './types';

interface Params {
  userId: string;
}

export function getLevelsAndRoles({userId}: Params) {
  return get<LevelsAndRoles>(
    `/achievement-summaries/levels-and-roles/users/${userId}`,
  );
}
