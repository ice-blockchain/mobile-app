// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';

import {Role} from './types';

interface Params {
  userId: string;
}

interface LevelsAndRoles {
  level: number;
  roles: Role[];
}

export function getLevelsAndRoles({userId}: Params) {
  return get<LevelsAndRoles>(
    `/achievement-summaries/levels-and-roles/users/${userId}`,
  );
}
