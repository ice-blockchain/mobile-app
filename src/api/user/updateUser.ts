// SPDX-License-Identifier: BUSL-1.1

import {patch} from '@api/client';

interface Params {
  userId: string;
  username: string | null;
}

/**
 * Modifies an user account
 */

export function updateUser({userId, username}: Params) {
  return patch(`/users/${userId}`, {
    username,
  });
}
