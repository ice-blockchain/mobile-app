// SPDX-License-Identifier: BUSL-1.1

import {patch} from '@api/client';
import {UserProfile} from '@api/user/types';

interface Params {
  userId: string;
  username: string;
}

/**
 * Modifies an user account
 */

export function updateUser({userId, username}: Params) {
  return patch<{username: string}, UserProfile>(`/users/${userId}`, {
    username,
  });
}
